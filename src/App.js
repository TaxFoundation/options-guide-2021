import Navigation from './components/Navigation';

function App() {
  const options = [
    { id: 1, title: 'Do a tax thing' },
    { id: 2, title: 'Create a tax on taxes' },
    { id: 3, title: 'Tax the Rich, but also the Middle Class and Poor' },
  ];
  return (
    <div>
      <Navigation options={options}></Navigation>
    </div>
  );
}

export default App;
