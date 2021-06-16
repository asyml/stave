import React, {useState, useEffect} from 'react';
import {
  IAnnotation,
  ISinglePack,
  transformBackAnnotation,
  transformPack,
} from '../../nlpviewer';
import {PluginComponentProp} from '../lib/interface';
import style from './DialogueBox.module.css';
import TextInput from './TextInput';
import {useParams} from 'react-router-dom';
import {editText, addAnnotation, loadNlpModel, runNlp} from '../../app/lib/api';

function Cell(cell_text: string, cell_key: string) {
  return <td key={cell_key}>{cell_text}</td>;
}

function Row(row_text: string, row_key: string) {
  return (
    <tr key={row_key}>
      {row_text
        .split('|')
        .reverse()
        .filter((c, i) => i > 0)
        .map((c, i) => {
          return Cell(c, row_key + '_' + i.toString());
        })}
    </tr>
  );
}

function Table(text: string, annotation: IAnnotation) {
  const table_str = text.substring(annotation.span.begin, annotation.span.end);
  return (
    <table className={style.table} key={'context_table_' + annotation.id}>
      <tbody key={'context_tbody_' + annotation.id}>
        {table_str.split(' ').map((row, i) => {
          return Row(row, 'context_table_row_' + i.toString());
        })}
      </tbody>
    </table>
  );
}

function Utterance(text: string, annotation: IAnnotation) {
  if (annotation.attributes.speaker === 'ai') {
    return (
      <div
        className={style.bubble_container}
        key={'utterance_container_' + annotation.id}
      >
        <div>
          <div className={style.speaker_icon}>&#x1F916;</div>
          <div
            className={style.bubble_left}
            key={'utterance_bubble_' + annotation.id}
          >
            <div key={'utterance_' + annotation.id}>
              <span
                dangerouslySetInnerHTML={{
                  __html: text.substring(
                    annotation.span.begin,
                    annotation.span.end
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else if (annotation.attributes.speaker === 'user') {
    return (
      <div
        className={style.bubble_container}
        key={'utterance_container_' + annotation.id}
      >
        <div
          className={style.bubble_right}
          key={'utterance_bubble_' + annotation.id}
        >
          <div key={'utterance_' + annotation.id}>
            {text.substring(annotation.span.begin, annotation.span.end)}
          </div>
        </div>
      </div>
    );
  } else {
    // This case is likely to caused by an incorrect ontology associated with the data pack.
    return (
      <div
        className={style.bubble_container}
        key={'utterance_container_' + annotation.id}
      >
        <div
          className={style.bubble_right}
          key={'utterance_bubble_' + annotation.id}
        >
          ...
        </div>
      </div>
    );
  }
}

function DialogueBox(props: PluginComponentProp) {
  const {id} = useParams();

  // Avoid confusion between doc_id and annotation id.
  const doc_id = id;

  const [pack, setPack] = useState<ISinglePack | null>(props.appState.textPack);
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);

  console.log(props.appState.textPack);

  useEffect(() => {
    try {
      loadNlpModel(doc_id).then(response => {
        if (response.headers.get('load_success') === 'True') {
          console.log('Model Loaded Successfully.');
          setModelLoaded(true);
        } else {
          console.log('Model not loaded, check backend log.');
        }
      });
    } catch (error) {
      console.log('Error during loading model.');
      console.error(error);
    }
  }, []);

  if (!pack) {
    return null;
  }

  const {annotations, text} = pack;

  const contexts = annotations.filter(ann => {
    return ann.legendId === 'ft.onto.base_ontology.UtteranceContext';
  });

  const utterances = annotations.filter(ann => {
    // TODO: This did not read the class hierarchy.
    return ann.legendId === 'ft.onto.base_ontology.Utterance';
  });

  return (
    <div className={style.plugin_box} key="plugin-dialogue-box">
      <div key="dialogue-context-container">
        {contexts.map(ann => {
          return Table(text, ann);
        })}
      </div>
      <div
        className={style.dialogue_utterances_container}
        key="dialogue-utterances-container"
      >
        {utterances.map(ann => {
          return Utterance(text, ann);
        })}
      </div>
      <div className={style.hl}></div>
      <div className={style.dialogue_input_container} key="dialogue-text-input">
        <TextInput
          textValue="enter text here"
          textPack={pack}
          onEvent={event => {
            if (event.type === 'new-utterance') {
              const {text, ...annotation} = event;
              const annotationAPIData = transformBackAnnotation(annotation);

              editText(doc_id, text).then(() => {
                addAnnotation(doc_id, annotationAPIData).then(({id}) => {
                  // Update the pack, first set the text then, add the new annotation.
                  annotation.id = id;

                  setPack({
                    ...pack,
                    text: text,
                    annotations: [...pack.annotations, annotation],
                  });
                  if (modelLoaded) {
                    runNlp(doc_id).then(data => {
                      const [singlePackFromAPI] = transformPack(
                        data.textPack,
                        JSON.stringify(props.appState.ontology)
                      );
                      // Just printing the name to avoid "never used" command.
                      setPack({
                        ...singlePackFromAPI,
                      });
                    });
                  }
                });
              });
            }
          }}
        ></TextInput>
      </div>
    </div>
  );
}

function enabled() {
  return true;
}

const plugin = {
  name: 'DialogueBox',
  component: DialogueBox,
  enabled: enabled,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnEventType = (event: any) => void;
export default plugin;
