import { A } from "@solidjs/router"
import styles from "./Footer.module.css"

const Footer = () => (
	<footer class={styles.footer}>
		<p class={styles.text}>
			©{" "}
			<A href="https://seanvelasco.com" target="_blank">
				sean.app
			</A>
		</p>
	</footer>
)

export default Footer
