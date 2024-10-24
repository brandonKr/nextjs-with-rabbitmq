export async function getServerSideProps() {
  const userRequest = await fetch('https://jsonplaceholder.typicode.com/todos/2');
  const userData = await userRequest.json();

  console.log(userData);
  return {
    props: {
      user: userData,
    },
  };
}

function Home(props) {
  return (
    <div>
      <h1>{props.user.userId}</h1>
      <h1>{props.user.title}</h1>
      <h1>{props.user.id}</h1>
    </div>
  );
}

export default Home;