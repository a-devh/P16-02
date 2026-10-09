import { Fragment } from 'react'
import { Divider, Group, Stack, Text, Title } from '@mantine/core'

function BrickDetails({ brick }) {
  const details = [
    ['Inscription', brick?.inscription ?? '—'],
    ['Campus', brick?.campus ?? '—'],
    ['Section', brick?.section ?? '—'],
    ['Brick number', brick?.number ?? '—'],
    ['Brick ID', brick?.id ?? '—'],
  ]

  return (
    <Stack className="brick-details" gap={8}>
      <span className="section-kicker">INSCRIPTION DETAILS</span>
      <Title order={3} className="brick-detail-name">{brick?.name ?? '—'}</Title>
      <Stack gap={0}>
        {details.map(([label, value], index) => (
          <Fragment key={label}>
            <Group className="brick-detail-row" justify="space-between" wrap="nowrap">
              <Text component="span" c="dimmed">{label}</Text>
              <Text component="span" fw={700} ta="right">{value}</Text>
            </Group>
            {index < details.length - 1 && <Divider className="brick-detail-divider" />}
          </Fragment>
        ))}
      </Stack>
    </Stack>
  )
}

export default BrickDetails
