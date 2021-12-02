import Navbar from '../Navbar'
import { PropsWithChildren } from 'react'

type LayoutProps = PropsWithChildren<{}>

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	)
}

export default Layout
