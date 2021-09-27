import { useState } from 'react';
// material-ui
import { Typography } from '@mui/material';

// project imports
import { MainCard } from 'components';
import { Switches } from 'components';

//==============================|| SAMPLE PAGE ||==============================//

const SocialProfile = () => {
  const [swtch, setSwtch] = useState({
    'Start DND Mode': true,
    'Allow Notifications': false,
  });
  const handleChange = (event) => {
    setSwtch({
      ...swtch,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <MainCard title="Social Profile">
      <Switches items={swtch} onChange={handleChange} />
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
  );
};

export default SocialProfile;
