import styles from '../styles/Home.module.css';

function ProcessBrowserPage() {
  return (
    <>
      <main className={styles.main}>
        <p> I'm running on the {typeof window !== "undefined" ? 'client' : 'server'} </p>
      </main>
    </>
  );
}

export default ProcessBrowserPage;