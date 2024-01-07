'use client'

import { useState } from 'react'

export default function Home() {
  const [animals, setAnimals] = useState(['🐻', '🐻‍❄️', '🐵', '🦍'])

  async function handleClick() {
    const result = await window.electronAPI.ping()
    setAnimals([...animals, result])
  }

  return (
    <main className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="font-semibold text-2xl">Hello, world</h1>
      <div>{animals.join(' ')}</div>

      <table>
        <tr>
          <th>Chrome</th>
          <td>{window.versions.chrome()}</td>
        </tr>
        <tr>
          <th>NodeJS</th>
          <td>{window.versions.node()}</td>
        </tr>
        <tr>
          <th>Electron</th>
          <td>{window.versions.electron()}</td>
        </tr>
      </table>

      <button
        className="bg-emerald-500 px-4 py-2 rounded-sm shadow-sm text-sm font-semibold"
        onClick={handleClick}
      >
        Ping
      </button>
    </main>
  )
}
