import { Group, SegmentedControl, Text } from '@mantine/core'
import { campuses } from '../data/campuses.js'

function KsuMap({ campus, onCampusChange, selectedBrick, children }) {
  const campusOptions = campuses.map((option) => ({
    label: option.shortName,
    value: option.name,
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
        <div
          className="ksu-map-overlay"
          data-campus={campus}
          data-brick-id={selectedBrick?.id ?? ''}
          aria-hidden="true"
        />
      </div>
    </>
  )
}

export default KsuMap
