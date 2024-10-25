import fetch from 'isomorphic-fetch';

export async function getServerSideProps() {
  const userRequest = await fetch('https://jsonplaceholder.typicode.com/todos/2');
  const userData = await userRequest.json();

  return {
    props: {
      user: userData
    },
    // revalidate: 10, //api 대기 시간
  };
}

function fetch_sample(props) {
  return (
    props.user && (
    <div>
      <h1>{props.user.userId}</h1>
      <h1>{props.user.title}</h1>
      <h1>{props.user.id}</h1>
    </div>
    )
    //array map 형태일경우
    /*
    <>
      {props.user && props.user.map((user) => (
        <div>
          <h1>{user.userId}</h1>
          <h1>{user.title}</h1>
          <h1>{user.id}</h1>
        </div>
      ))}
    </>
    */
  );
}

export default fetch_sample;