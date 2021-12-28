import Navbar from '../Navbar'
import styles from './Layout.module.scss'
import { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{}>

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<main className={styles.container}>{children}</main>
		</>
	)
}

export default Layout
