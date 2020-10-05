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

const useStyles = makeStyles({
  root: {
    minWidth: 300,
    minHeight: 150,
  },

  title: {
    fontSize: 14,
  },
  
});

function Projects() {
  const classes = useStyles();
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [ontology, setOntology] = useState<string>('');
  const history = useHistory();
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const clearDialog = () => {
    setOntology('');
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
    if (name && ontology){
      createProject(name, ontology).then(() =>{
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
      }
    }
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
                    <div>
                      <TextField
                      id="outlined-multiline-flexible"
                      label="Ontology Body"
                      value={ontology}
                      onChange={e => setOntology(e.target.value)}
                      multiline
                      rows={10}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      />
                    </div> 
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
