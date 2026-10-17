import { Group, SegmentedControl, Text } from '@mantine/core'
import { campuses } from '../data/campuses.js'

function KsuMap({ campus, onCampusChange, children }) {
  const campusOptions = campuses.map((option) => ({
    label: option.shortName,
    value: option.shortName,
  }))

  return (
    <>
      <div className="map-toolbar">
        <Group justify="space-between" w="100%" wrap="nowrap">
          <SegmentedControl
            aria-label="Choose campus"
            className="campus-switcher"
            data={campusOptions}
            onChange={onCampusChange}
            value={campus}
          />
          <Text component="span" className="map-label">
            CAMPUS DIRECTORY <i>·</i> 01
          </Text>
        </Group>
      </div>
      <div className="map-stage">
        {children}
      </div>
    </>
  )
}

export default KsuMap
