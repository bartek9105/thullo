import { useGetBoards } from '../../hooks/useGetBoards'
import Board from '../Board'
import Button from '../Button'
import styles from './AllBoards.module.scss'

const AllBoards = () => {
	const { boards } = useGetBoards()

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1 className={styles.title}>All Boards</h1>
				<Button>Add</Button>
			</div>
			<div className={styles.boardsContainer}>
				{boards &&
					boards.map(({ id, name, img_url }) => (
						<Board key={id} name={name} imgUrl={img_url} />
					))}
			</div>
		</div>
	)
}

export default AllBoards
