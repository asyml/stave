import React, { useState } from 'react';
export interface ConsentFormProp {
  onEvent: any;
}

function ConsentForm({onEvent}: ConsentFormProp) {
  const [checked11, setChecked11] = useState<boolean>(false);
  const [checked12, setChecked12] = useState<boolean>(false);
  const [checked21, setChecked21] = useState<boolean>(false);
  const [checked22, setChecked22] = useState<boolean>(false);
  const [checked31, setChecked31] = useState<boolean>(false);
  const [checked32, setChecked32] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  function check11() {
    setChecked11(!checked11);
    setChecked12(false);
  }
  function check12() {
    setChecked12(!checked12);
    setChecked11(false);
  }
  function check21() {
    setChecked21(!checked21);
    setChecked22(false);
  }
  function check22() {
    setChecked22(!checked22);
    setChecked21(false);
  }
  function check31() {
    setChecked31(!checked31);
    setChecked32(false);
  }
  function check32() {
    setChecked32(!checked32);
    setChecked31(false);
  }

  function handleSubmit(){
    if (checked11 && checked21 && checked31){
      onEvent();
    }
    else{
      setError(true);
    }
  }

  return (
    <div>
      <h2>Consent From</h2>
      <p>
      This task is part of a research study conducted by Teruko Mitamura at Carnegie Mellon University and is funded by Defense Advanced Research Projects Agency.
      </p>

      <h4>Purpose</h4>
      <p>
      The goal of this study is to collect datasets of coreference-labeled pairs sampled from public online news articles through the help of crowd workers.
      </p>

      <h4>Procedures</h4>
        <p>
      You will be directed to a website implemented by the research team to complete the task. You will be asked to read 2 pairs of articles. For each pair of articles, you will need to label pieces of text that refer to the same event, and answer additional questions about your labeling. Labeling one pair of articles whose length sums up to 20 sentences is expected to take around 6 minutes. The task is expected to take 12 minutes.
        </p>

      <h4>Participant Requirements</h4>
        <p>
      Participation in this study is limited to individuals age 18 and older, and native English speakers.
        </p>

      <h4>Risks</h4>
        <p>
      The risks and discomfort associated with participation in this study are no greater than those ordinarily encountered in daily life or during other online activities.
        </p>

      <h4>Benefits</h4>
        <p>
      There may be no personal benefit from your participation in the study but the knowledge received may be of value to humanity.
        </p>

      <h4>Compensation & Costs</h4>
      <p>
      For this task, you will receive $2.40 for annotating 2 pairs of articles. You will not be compensated if you provide annotations of poor quality.
      <br/>
      There will be no cost to you if you participate in this study.
      </p>

      <h4>Future Use of Information and/or Bio-Specimens</h4>
      <p>
      In the future, once we have removed all identifiable information from your data (information or bio-specimens), we may use the data for our future research studies, or we may distribute the data to other researchers for their research studies.  We would do this without getting additional informed consent from you (or your legally authorized representative).  Sharing of data with other researchers will only be done in such a manner that you will not be identified.
      </p>


      <h4>Confidentiality</h4>
      <p>
      The data captured for the research does not include any personally identifiable information about you except your IP address and Mechanical Turk worker ID.
      <br/>
      By participating in this research, you understand and agree that Carnegie Mellon may be required to disclose your consent form, data and other personally identifiable information as required by law, regulation, subpoena or court order.  Otherwise, your confidentiality will be maintained in the following manner:
      <br/>
      Your data and consent form will be kept separate. Your consent form will be stored in a secure location on Carnegie Mellon property and will not be disclosed to third parties. By participating, you understand and agree that the data and information gathered during this study may be used by Carnegie Mellon and published and/or disclosed by Carnegie Mellon to others outside of Carnegie Mellon.  However, your name, address, contact information and other direct personal identifiers will not be mentioned in any such publication or dissemination of the research data and/or results by Carnegie Mellon. Note that per regulation all research data must be kept for a minimum of 3 years.
      <br/>
      The Federal government offices that oversee the protection of human subjects in research will have access to research records to ensure protection of research subjects.
      </p>


      <h4>Right to Ask Questions & Contact Information</h4>
       <p>
      If you have any questions about this study, you should feel free to ask them by contacting the Principal Investigator now at Teruko Mitamura, Language Technologies Institute, 5000 Forbes Avenue, Pittsburgh, PA, 15213, or by phone at 412-268-6596, or via email at teruko@cs.cmu.edu. If you have questions later, desire additional information, or wish to withdraw your participation please contact the Principal Investigator by mail, phone or e-mail in accordance with the contact information listed above.
        <br/>
      If you have questions pertaining to your rights as a research participant; or to report concerns to this study, you should contact the Office of Research integrity and Compliance at Carnegie Mellon University.  Email: irb-review@andrew.cmu.edu . Phone: 412-268-1901 or 412-268-5460.
       </p>

      <h4>Voluntary Participation</h4>
        <p>
      Your participation in this research is voluntary.  You may discontinue participation at any time during the research activity.  You may print a copy of this consent form for your records.
        </p>

      <div>I am age 18 or older.
      <label style={{marginLeft:"2rem"}}><input
        name="isGoing"
        type="checkbox"
        checked={checked11}
        onChange={check11} /> Yes</label>

        <label style={{marginLeft:"1rem"}}><input
          name="isGoing"
          type="checkbox"
          checked={checked12}
          onChange={check12} /> No</label>
      </div><br/>
      <div>I have read and understand the information above.
        <label style={{marginLeft:"2rem"}}><input
          name="isGoing"
          type="checkbox"
          checked={checked21}
          onChange={check21} /> Yes</label>

        <label style={{marginLeft:"1rem"}}><input
          name="isGoing"
          type="checkbox"
          checked={checked22}
          onChange={check22} /> No</label>
      </div><br/>
      <div>I want to participate in this research and continue with the task.
        <label style={{marginLeft:"2rem"}}><input
          name="isGoing"
          type="checkbox"
          checked={checked31}
          onChange={check31} /> Yes</label>

        <label style={{marginLeft:"1rem"}}><input
          name="isGoing"
          type="checkbox"
          checked={checked32}
          onChange={check32} /> No</label>
      </div>
      <br/>
      {error ?
        <p style={{color:'red'}}>You need to answer yes to all agreements to continue.
        </p>
        : null}
      <button style={{marginBottom:"2rem"}} onClick={handleSubmit}> Submit </button>

    </div>

  );
}

export default ConsentForm;
