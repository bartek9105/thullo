import styles from './Board.module.scss'
import Image from 'next/image'
import { Board } from '../../types/Board'

type BoardProps = Omit<Board, 'id' | 'created_at'>

const Board = ({ name, imgUrl }: BoardProps) => {
	return (
		<article className={styles.container}>
			<Image
				src={imgUrl}
				alt={name}
				width={219}
				height={130}
				className={styles.image}
			/>
			<h2 className={styles.name}>{name}</h2>
		</article>
	)
}

export default Board
