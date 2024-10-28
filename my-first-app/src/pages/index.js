import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<>
			<div className={styles.container}>
				<main className={styles.main}>
					<h1 className={styles.title}>배송 로봇 RabbitMq Api samples</h1>

					<div className={styles.grid}>
						<Link href="/api/hello">
							<div className={styles.card}>
								<h3>Hello api &rarr;</h3>
								<p>API 기초 샘플</p>
								<p>호출 URL : /api/hello</p>
							</div>
						</Link>
						<Link href="/api/postque">
							<div className={styles.card}>
								<h3>Call queue Sample &rarr;</h3>
								<p>amq create queue	 생성 호출 API 샘플</p>
								<p>rest api 툴 가지고 body 에 담아서 호출 해야함</p>
								<p>호출 URL : /api/postque</p>
							</div>
						</Link>
						<Link href="/">
							<div className={styles.card}>
								<h3>amp consume sample &rarr;</h3>
								<p>clinet 형태로 서버 로딩 되면서 자동 실행</p>
								<p>terminal 에 있는 로그로 확인할 것</p>
							</div>
						</Link>
                        <Link href="/example/fetch_sample">
							<div className={styles.card}>
								<h3>Fech data sample &rarr;</h3>
								<p>api fetch 데이터 Sample</p>
								<p>호출 URL : /example/fetch_sample</p>
							</div>
						</Link>
					</div>
				</main>
			</div>
		</>
	);
}