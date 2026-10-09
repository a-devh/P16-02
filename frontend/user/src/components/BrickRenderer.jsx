import { Text } from '@mantine/core'

function BrickRenderer({ brick }) {
  return (
    <div className={`brick-preview${brick ? ' has-brick' : ''}`}>
      {brick ? (
        <div className="brick-face">
          <span>{brick.name}</span>
          <small>{brick.inscription}</small>
        </div>
      ) : (
        <Text component="span" className="preview-prompt">
          Select a name
          <br />
          to preview its brick
        </Text>
      )}
    </div>
  )
}

export default BrickRenderer
