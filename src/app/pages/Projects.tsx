import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, deleteProject } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';
import {FileWithPath} from 'react-dropzone';
import DropUpload from '../components/dropUpload';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PostAddSharpIcon from '@material-ui/icons/PostAddSharp';
import { 
  ILegendAttributeConfig, 
  ILegendConfig, 
  IProjectConfigs,
  IOntology,
} from '../../nlpviewer';
import { isEntryAnnotation, camelCaseDeep } from '../../nlpviewer/lib/utils';
import JsonEditor from '../components/jsonEditor';

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    minHeight: 150,
  },

  title: {
    fontSize: 14,
  },
  
  jsonEditor: {
    marginBottom: 15,
  },
});

function Projects() {
  const classes = useStyles();
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [ontology, setOntology] = useState<string>('{}');
  const [config, setConfig] = useState<string>('{}');
  const history = useHistory();
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearDialog = () => {
    setOntology('{}');
    setConfig('{}');
    setName('');
  };

  useEffect(() => {
    updateProjects().catch(e => {
      history.push('/login');
    });
  }, [history]);

  function updateProjects() {
    return fetchProjects().then(projects => {
      setProjects(projects);
    });
  }

  function handleAdd() {
    if (name && ontology && config){
      createProject(name, ontology, config).then(() =>{
        updateProjects();
      });
    } else{
      alert("Please fill in project name and upload ontology file.");
    }
  }

  function handleDelete(id: string) {
    deleteProject(id).then(() => {
      updateProjects();
    });
  }

  function userAddFiles(acceptedFiles: FileWithPath[]) {
    if (acceptedFiles.length > 0){    
      const reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);
      reader.onload = function() {
        setOntology(reader.result as string);  
        const defaultConfig = createDefaultConfig(reader.result as string); 
        setConfig(JSON.stringify(defaultConfig));    
      }
    }
  }
  
  function createDefaultConfig(ontology: string): IProjectConfigs {
    const ontologyJson = JSON.parse(ontology);
    const ontologyObject : IOntology = camelCaseDeep(ontologyJson);
    let config : IProjectConfigs = {legendConfigs: {}, scopeConfigs: {}, layoutConfigs:{}};
    for (const entry of ontologyJson.definitions) {
      const entryName = entry.entry_name;
      // Scope configs should contain annotations only.
      if (isEntryAnnotation(ontologyObject, entryName)) {
        config['scopeConfigs'][entryName] = false;
      }
      
      let legendConfig : ILegendConfig = {is_selected: false, is_shown: true};
      config['legendConfigs'][entryName] = legendConfig;
      if (entry.attributes && entry.attributes.length > 0) {
        let attributeConfig : ILegendAttributeConfig = {};
        config['legendConfigs'][entryName]['attributes'] = attributeConfig;
        for (const attribute of entry.attributes) {
          if (attribute.type === 'str') {
            attributeConfig[attribute.name] = false;
          }
        }
      }

      //TODO hard coded default layoutConfigs -- might need to change
      config['layoutConfigs']['center-middle'] = 'default-nlp';
      config['layoutConfigs']['left'] = "default-meta";
      config['layoutConfigs']['right'] = "default-attribute";
      config['layoutConfigs']['center-bottom'] = "disable";
    }
    return config;
  }

  return (
    <div className={classes.root}>
      <div className="content">
        <Typography variant="h3">
              All Projects:
          </Typography>
      </div>
      <div className="content">
        <Grid 
        container 
        className={classes.root} 
        justify="flex-start" 
        spacing={2}>
          {projects.map(d => (         
            <Grid key={d.id} item>
              <Card className={classes.root}>
                <CardHeader 
                  title={d.name} 
                  action={
                  <IconButton 
                  onClick={() => handleDelete(d.id)}
                  aria-label="delet"
                  >
                    <DeleteForeverSharpIcon />
                  </IconButton >
                  }
                />
                {/* CardActionArea part is for adding project introduction in the future */}
                <CardActionArea>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button 
                  component={Link} to={`/project/${d.id}`} 
                  size="small" 
                  color="primary"
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>        
            </Grid>
          ))}
          <Grid item>
            <Card className={classes.root}>
              <CardHeader title="New Project" />
              <CardActions>
                <IconButton onClick={handleClickOpen}>
                  <PostAddSharpIcon fontSize="large" />
                </IconButton>
                <Dialog open={open} onClose={handleClose}>
                  <DialogContent>
                    <div>
                      <TextField 
                      variant="outlined"
                      label="Project Name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      autoFocus
                      fullWidth
                      margin="normal"
                      />
                    </div>
                    <JsonEditor
                      className={classes.jsonEditor}
                      jsonText={ontology}
                      onChangeJsonText={(text: string) => setOntology(text)}
                    />
                    <JsonEditor
                      className={classes.jsonEditor}
                      jsonText={config}
                      onChangeJsonText={(text: string) => setConfig(text)}
                    />
                    <div>
                      <DropUpload
                        fileLimit={1048576}
                        fileDropFunc={userAddFiles}
                        mimeType='application/json'
                        allowMultiple={false}
                      />
                    </div>
                    <div>
                      <Button
                        onClick={() => {
                        handleAdd();
                        handleClose();
                        clearDialog();
                        }}  
                        color="primary"
                        size="small" 
                        variant="contained"
                        disableElevation
                      >
                        Add
                      </Button>
                    </div>

                  </DialogContent>
                </Dialog>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>     
    </div>
  );
}

export default Projects;
