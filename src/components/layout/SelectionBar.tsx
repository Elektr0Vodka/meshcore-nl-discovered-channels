interface Props {
  selectionSize: number
  onSelectAll: () => void
  onClear: () => void
  onExportTxt: () => void
  onExportRtfm: () => void
  onExportJson: () => void
}

export default function SelectionBar({
  selectionSize,
  onSelectAll,
  onClear,
  onExportTxt,
  onExportRtfm,
  onExportJson,
}: Props) {
  return (
    <div className={`sel-bar${selectionSize > 0 ? ' visible' : ''}`}>
      <span className="sel-count">{selectionSize} selected</span>
      <button className="btn" onClick={onSelectAll}>Select all visible</button>
      <button className="btn" onClick={onClear}>Clear selection</button>
      <div className="vr" />
      <button className="btn" onClick={onExportTxt}>⬇ TXT</button>
      <button className="btn" onClick={onExportRtfm}>⬇ RTfM</button>
      <button className="btn" onClick={onExportJson}>⬇ JSON</button>
    </div>
  )
}
