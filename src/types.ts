export interface ChannelMeta {
  channel: string
  category?: string
  subcategory?: string
  country?: string
  region?: string
  language?: string[]
  scopes?: string[]
  tags?: string[]
  notes?: string
  last_seen?: string
  added?: string
  verified?: boolean
  recommended?: boolean
}

export interface Channel extends ChannelMeta {
  _key: string
  _hasMeta: boolean
  _localEdit: boolean
}

export type SortField = 'alpha' | 'category' | 'subcategory' | 'country' | 'region' | 'scope' | 'last_seen' | 'added'
export type SortDir = 'asc' | 'desc'
export type ViewMode = 'grid' | 'list'
export type ToastType = 'ok' | 'err'

export interface ToastMsg {
  id: number
  msg: string
  type: ToastType
}

export interface FilterState {
  search: string
  category: string
  subcategory: string
  region: string
  scope: string
  country: string
  onlyScoped: boolean
  onlyBare: boolean
}
