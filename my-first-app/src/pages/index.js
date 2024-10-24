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
						<Link href="/api/createque">
							<div className={styles.card}>
								<h3>Call queue &rarr;</h3>
								<p>배송로봇 queue	 생성 호출 API 샘플</p>
								<p>호출 URL : /api/createque</p>
							</div>
						</Link>
						<Link href="/api/getconsume">
							<div className={styles.card}>
								<h3>process.browser &rarr;</h3>
								<p>배송로봇 consumer 생성 호출 API 샘플</p>
								<p>호출 URL : /api/getconsume</p>
							</div>
						</Link>
                        <Link href="/example/fetch_sample">
							<div className={styles.card}>
								<h3>process.browser &rarr;</h3>
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