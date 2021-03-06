import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import APIService from '../../service/APIService';
import {
  Typography, Input, Button, DropDownMenu,
} from '../../Components';
import { useToast, ToastConstants } from '../../store/context';
import { JOB_APPLICATION_PRIORITY, JOB_APPLICATION_STATUS } from '../../constants/Constants';

const useStyles = makeStyles(({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  displayFlex: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    marginLeft: 30,
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const BasicDetails = props => {
  const showToast = useToast();
  const classes = useStyles();
  const { basicDetail, reload } = props;
  const [title, setTitle] = useState(basicDetail.title);
  const [companyName, setCompanyName] = useState(basicDetail.company.name);
  const [companyUrl, setCompanyUrl] = useState(basicDetail.company.url || '');
  const [status, setStatus] = useState(basicDetail.status);
  const [priority, setPriority] = useState(basicDetail.priority);
  const [description, setDescription] = useState(basicDetail.description || '');
  const [url, setUrl] = useState(basicDetail.url || '');
  const [location, setLocation] = useState(basicDetail.location || '');

  const handleSubmit = event => {
    event.preventDefault();
    const jobDetail = {
      title,
      company_name: companyName,
      company_url: companyUrl,
      status,
      priority,
      description,
      url,
      location,
    };
    APIService.updateJobApplication(basicDetail.applicationId, jobDetail)
      .then(() => {
        showToast('Update success', ToastConstants.SUCCESS);
        reload();
      })
      .catch(() => showToast('Update failed', ToastConstants.ERROR));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="primary">
        Application Details
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.spaceBetween}>
          <Input
            type="text"
            label="Title"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
          <DropDownMenu label="Priority" options={JOB_APPLICATION_PRIORITY} value={priority} onChange={e => setPriority(e.target.value)} />
          <DropDownMenu label="Status" options={JOB_APPLICATION_STATUS} value={status} onChange={e => setStatus(e.target.value)} />
        </div>
        <div className={classes.spaceBetween}>
          <Input
            type="text"
            label="Company Name"
            onChange={e => setCompanyName(e.target.value)}
            value={companyName}
          />
          <Input
            type="text"
            label="Location"
            onChange={e => setLocation(e.target.value)}
            value={location}
          />
        </div>
        <Input
          type="text"
          label="Company Link"
          onChange={e => setCompanyUrl(e.target.value)}
          value={companyUrl}
        />
        <Input type="text" label="Job post url" onChange={e => setUrl(e.target.value)} value={url} />
        <Input
          type="text"
          label="Description"
          multiline
          rows="4"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <div className={classes.displayFlex}>
          <Button type="submit" style={{ marginTop: '20px', marginBottom: '5px' }}>Update</Button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;
