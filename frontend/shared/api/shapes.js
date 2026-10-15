
export const Section = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'
export const Role = 'Student' | 'Staff' | 'Admin'
export const Campus = {
  kennesaw: {
    name: 'Kennesaw Campus',
    shortName: 'Kennesaw',
    center: [-84.5817445, 34.0381707],
    zoom: 18,
    sections: {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      L: []
    }
  },
  marietta: {
    name: 'Marietta Campus',
    shortName: 'Marietta',
    center: [-84.5213056, 33.9376667],
    zoom: 18,
    sections: {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      L: []
    }
  },
}

const Brick = () => {
  id: number
  name: string
  inscription: string | null
  campus: Campus
  section: Section
  number: number
}

const AdminBrick = () => {
  deleted: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

const User = () => {
  id: number
  name: string
  email: string
  username: string
  role: Role
  locked: boolean
  deleted: boolean
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
}

const Page = () => {
    content: [] //Brick, AdminBrick, or User object array
    page: number
    size: number
    total: number
    pages: number
}