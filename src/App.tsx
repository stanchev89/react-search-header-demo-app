import { FlexBoxFullWidth, FullWidthColumnFlexbox } from './components/common/boxes';
import Sidebar from './components/sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Users from './components/users/Users';
import Todos from './components/todos/Todos';
import Comments from './components/comments/Comments';
import Posts from './components/posts/Posts';
import Intro from './components/Intro';

function App() {

  return (
    <FlexBoxFullWidth overflow={'hidden'} height={'100vh'}>
      <Sidebar/>
      
      <FullWidthColumnFlexbox p={4} sx={{ overflowX: 'hidden' }}>
        <Routes>
          <Route index element={<Navigate to={'/intro'}/>}/>
          <Route path={'/intro'} element={<Intro/>}/>
          <Route path={'/user'} element={<Users/>}/>
          <Route path={'/todo'} element={<Todos/>}/>
          <Route path={'/comment'} element={<Comments/>}/>
          <Route path={'/post'} element={<Posts/>}/>
        </Routes>
      </FullWidthColumnFlexbox>

    </FlexBoxFullWidth>
  );
}

export default App;
