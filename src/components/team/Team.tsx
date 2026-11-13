import styles from './Team.module.scss'
import { getTeam } from '@/constants/team'
import { getContent } from '@/server/content'
import { Avatar } from '@/ui/avatar/Avatar'
import { Carousel } from '@/ui/carousel/Carousel'
import { GridBackdrop } from '@/ui/grid-backdrop/GridBackdrop'
import { Reveal } from '@/ui/reveal/Reveal'

export async function Team() {
	const content = await getContent()

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
				content={content.team.schemaName}
			/>
			<GridBackdrop />

			<div className='container'>
				<Carousel
					id='team-track'
					headingId='team-title'
					title={content.team.title}
					description={content.team.description}
					label={content.team.label}
					prevLabel={content.a11y.carouselPrev}
					nextLabel={content.a11y.carouselNext}
					listClassName={styles.track}
				>
					{getTeam(content).map((member, index) => (
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
							<div className={styles.frame}>
								<Avatar
									name={member.name}
									src={member.photo}
									size={200}
									shape='plain'
									className={styles.photo}
									decorative
								/>
							</div>
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
