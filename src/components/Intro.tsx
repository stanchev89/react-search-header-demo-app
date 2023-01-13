import { FlexBoxFullWidth, FullWidthColumnFlexbox } from './common/boxes';
import { Box, Typography } from '@mui/material';
import scaleFocusLogoPath from '../assets/scalefocus-logo.png';
import reactLogoPath from '../assets/react.svg';

const topics = [
  'Reactive data search and filtering using query parameters. How do I do it effectively?',
  'How can we optimize our performance when we have a lot of data? Rendering list data with ViewportListRender custom component.',
  'Write some basic unit tests and see if Copilot can help us?',
];

const technologies = [
  'React',
  'TypeScript',
  'React Query',
  'Material UI',
  'JsonPlaceholder api as a service',
];

const Intro = () => {
  return (
    <FullWidthColumnFlexbox>
      <FlexBoxFullWidth justifyContent={'center'} alignItems={'center'}>
        <Box width={200}>
          <img src={scaleFocusLogoPath} alt={'Scalefocus logo'} style={{ width: '100%' }}/>
        </Box>
        <Box width={160} ml={4}>
          <img src={reactLogoPath} alt={'React logo'} style={{ width: '100%' }}/>
        </Box>
      </FlexBoxFullWidth>
      <Box mt={4}>
        <Typography variant={'h4'}>{'Demo app with following topics:'}</Typography>
      </Box>
      <ul>
        {
          topics.map((topic) => (
            <li key={topic}>
              <Typography variant={'body1'}>{topic}</Typography>
            </li>
          ))
        }
      </ul>
      <Box mt={4}>
        <Typography variant={'h4'}>{'Technologies used:'}</Typography>
      </Box>
      <ul>
        {
          technologies.map((tech) => (
            <li key={tech}>
              <Typography variant={'body1'}>{tech}</Typography>
            </li>
          ))
        }
      </ul>
    </FullWidthColumnFlexbox>
  );
};

export default Intro;