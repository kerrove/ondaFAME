import styles from './Team.module.scss'
import { TEAM } from '@/constants/team'
import { Avatar } from '@/ui/avatar/Avatar'
import { Carousel } from '@/ui/carousel/Carousel'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Reveal } from '@/ui/reveal/Reveal'

export function Team() {
	return (
		<section
			id='team'
			className='section'
			aria-labelledby='team-title'
			itemScope
			itemType='https://schema.org/ItemList'
		>
			<meta
				itemProp='name'
				content='Команда ONDA FAME'
			/>
			<GridBackdrop />

			<div className='container'>
				<Carousel
					id='team-track'
					headingId='team-title'
					title='Команда'
					description='Мы собрали людей, которые любят музыку и умеют делать её заметной.'
					label='Команда'
					listClassName={styles.track}
				>
					{TEAM.map((member, index) => (
						<Reveal
							key={member.id}
							as='li'
							index={index}
							className={styles.member}
							itemProp='itemListElement'
							itemScope
							itemType='https://schema.org/Person'
						>
							<meta
								itemProp='position'
								content={String(index + 1)}
							/>
							<Avatar
								name={member.name}
								src={member.photo}
								size={200}
								className={styles.photo}
								decorative
							/>
							<h3
								className={styles.name}
								itemProp='name'
							>
								{member.name}
							</h3>
							<p
								className={styles.role}
								itemProp='jobTitle'
							>
								{member.role}
							</p>
						</Reveal>
					))}
				</Carousel>
			</div>
		</section>
	)
}
