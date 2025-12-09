interface PersonaTheme {
  primary: string
  secondary: string
  accent: string
}

const arcanaPalette: Record<string, PersonaTheme> = {
  fool: { primary: '#2BC4FF', secondary: '#0A1B3A', accent: '#76E4FF' },
  magician: { primary: '#FF3D6E', secondary: '#1A000E', accent: '#FFC857' },
  priestess: { primary: '#5E60CE', secondary: '#0A0526', accent: '#C8D3FF' },
  empress: { primary: '#FF7A18', secondary: '#2A0A00', accent: '#FFE08C' },
  emperor: { primary: '#0CECDD', secondary: '#041B1A', accent: '#72FCD8' },
  lovers: { primary: '#FF4D95', secondary: '#18000C', accent: '#FFDDEB' },
  chariot: { primary: '#FFD166', secondary: '#2E1200', accent: '#FFF1C1' },
  hermit: { primary: '#64DFDF', secondary: '#031A1F', accent: '#CBF3F0' },
  strength: { primary: '#FF9F1C', secondary: '#2F1300', accent: '#FFE6C7' },
  star: { primary: '#00C6FF', secondary: '#041A2A', accent: '#8BF9FF' },
  moon: { primary: '#5B21B6', secondary: '#0D031F', accent: '#C4B5FD' },
  sun: { primary: '#FFB703', secondary: '#2B1200', accent: '#FFE7A3' },
  judgement: { primary: '#FF4F4F', secondary: '#1C0000', accent: '#FFD6A5' },
}

export const getPersonaTheme = (arcana?: string): PersonaTheme => {
  if (!arcana) {
    return { primary: '#76E4FF', secondary: '#05070F', accent: '#FF3D6E' }
  }
  return arcanaPalette[arcana] ?? { primary: '#76E4FF', secondary: '#05070F', accent: '#FF3D6E' }
}
