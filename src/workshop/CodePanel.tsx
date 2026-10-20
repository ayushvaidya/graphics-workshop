type CodePanelProps = {
  code: string
}

export function CodePanel({ code }: CodePanelProps) {
  return (
    <div className="panel code-panel">
      <h2 className="panel-title">Code</h2>
      <pre className="code-block">
        <code>{code}</code>
      </pre>
    </div>
  )
}
