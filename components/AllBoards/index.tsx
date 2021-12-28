import { useGetBoards } from '../../hooks/useGetBoards'
import Board from '../Board'
import styles from './AllBoards.module.scss'

const AllBoards = () => {
	const { boards } = useGetBoards()

	return (
		<div className={styles.container}>
			{boards &&
				boards.map(({ id, name, img_url }) => (
					<Board key={id} name={name} imgUrl={img_url} />
				))}
		</div>
	)
}

export default AllBoards
