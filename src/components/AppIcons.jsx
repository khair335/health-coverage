import {
  HiArrowDownTray,
  HiCalendarDays,
  HiCheck,
  HiCheckBadge,
  HiChevronRight,
  HiClipboardDocumentList,
  HiCurrencyDollar,
  HiDocumentText,
  HiGift,
  HiHeart,
  HiHomeModern,
  HiInformationCircle,
  HiLightBulb,
  HiLockClosed,
  HiMapPin,
  HiShieldCheck,
  HiSparkles,
  HiStar,
  HiUser,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi2'
import {
  LuActivity,
  LuAmbulance,
  LuBuilding2,
  LuCalendar,
  LuChartColumn,
  LuGlobe,
  LuHandHeart,
  LuHospital,
  LuMapPin,
  LuPill,
  LuScale,
  LuShield,
  LuStethoscope,
  LuUserRound,
} from 'react-icons/lu'
import { MdLocalHospital, MdOutlineMedicalServices } from 'react-icons/md'
import { TbBuildingHospital, TbHelp } from 'react-icons/tb'

export const appIcons = {
  check: HiCheck,
  chevronRight: HiChevronRight,
  heart: HiHeart,
  lightbulb: HiLightBulb,
  info: HiInformationCircle,
  download: HiArrowDownTray,
  shieldCheck: HiShieldCheck,
  lock: HiLockClosed,
  user: HiUser,
  users: HiUsers,
  userGroup: HiUserGroup,
  gift: HiGift,
  dollar: HiCurrencyDollar,
  shield: LuShield,
  chart: LuChartColumn,
  scale: LuScale,
  star: HiStar,
  sparkles: HiSparkles,
  activity: LuActivity,
  calendar: HiCalendarDays,
  document: HiDocumentText,
  clipboard: HiClipboardDocumentList,
  home: HiHomeModern,
  hospital: LuHospital,
  stethoscope: LuStethoscope,
  pill: LuPill,
  ambulance: LuAmbulance,
  globe: LuGlobe,
  mapPin: HiMapPin,
  building: LuBuilding2,
  handHeart: LuHandHeart,
  help: TbHelp,
  medical: MdOutlineMedicalServices,
  localHospital: MdLocalHospital,
  buildingHospital: TbBuildingHospital,
  userRound: LuUserRound,
  checkBadge: HiCheckBadge,
}

export function AppIcon({ name, className = 'h-5 w-5' }) {
  const Icon = appIcons[name]
  if (!Icon) return null
  return <Icon className={className} aria-hidden />
}

export const priorityIcons = {
  premium: { name: 'dollar', bg: 'bg-violet-100 text-violet-600' },
  deductible: { name: 'shield', bg: 'bg-blue-100 text-blue-600' },
  copay: { name: 'clipboard', bg: 'bg-rose-100 text-rose-600' },
  doctors: { name: 'stethoscope', bg: 'bg-sky-100 text-sky-600' },
  prescriptions: { name: 'pill', bg: 'bg-emerald-100 text-emerald-600' },
  specialist: { name: 'userGroup', bg: 'bg-amber-100 text-amber-600' },
  moop: { name: 'chart', bg: 'bg-indigo-100 text-indigo-600' },
}

export const usageIcons = {
  rarely: { name: 'home', bg: 'bg-slate-100 text-slate-600' },
  sometimes: { name: 'calendar', bg: 'bg-slate-100 text-slate-600' },
  often: { name: 'hospital', bg: 'bg-slate-100 text-slate-600' },
  unsure: { name: 'help', bg: 'bg-slate-100 text-slate-600' },
}

export const dashboardStatIcons = {
  indigo: 'users',
  amber: 'handHeart',
  orange: 'calendar',
  violet: 'document',
  emerald: 'shieldCheck',
}

export const pathNeedIcons = {
  '💰': 'dollar',
  '🛡': 'shield',
  '✅': 'checkBadge',
  '📋': 'clipboard',
  '👨‍👩‍👧': 'users',
  '🩺': 'stethoscope',
  '💵': 'dollar',
  '🆕': 'sparkles',
}
