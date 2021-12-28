import { PropsWithChildren } from 'react'
import styles from './Button.module.scss'

type ButtonProps = PropsWithChildren<{}>

const Button = ({ children, ...restProps }: ButtonProps) => {
	return (
		<button {...restProps} className={styles.button}>
			{children}
		</button>
	)
}

export default Button
