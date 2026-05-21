import { ReactNode } from "react";
import {
  FiBarChart2,
  FiBook,
  FiUsers,
  FiRefreshCw,
  FiTrendingUp,
  FiSettings,
  FiHelpCircle,
  FiStar,
} from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import {
  BookItem,
  CirculationItem,
  HowItWorksStep,
  NavItem,
  Testimonial,
  Book,
  BorrowedBook
} from "@/types/type";

export const recentBooks: BookItem[] = [
  {
    id: 1,
    title: "The Art of Knowledge",
    author: "Julian Thorne",
    year: 2023,
    genre: "Philosophy",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9-505vnOdpFyYctx23khrd_Ms32DFweZPgpwNDVeIZtY3GPdhJIat4YKMW57Q28Jaa9r275cmbzHvBE1cpIKMb7aPrnZie1VhsQ2gT8x39qIZRbawWtptqIHM3ODgbVQkcmXO1T5K2U4aQn47gx3Ei6BjFVkyswZuK02MGM9OMRrx9bxl5LIRCCiebyQ4CeltcgIR6VSqy7lzFqfNeAA8-7O9McuvvDmpW4D-KwSI1SjDJvZZ50h5Hmoj_ggl753_9ZeEZUOb0hE",
  },
  {
    id: 2,
    title: "Digital Renaissance",
    author: "Elena Rossi",
    year: 2024,
    genre: "Technology",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvWN4UzDJXRymNVHOgZHN7CrVhInV4P_xIyBGURm-I2_SD_Kenz2ExhQ4tVDyms85LO2olj6JH4PdhwCaWJL7yd5XLp1eB_ByOWL8fmFD03ZYA3ZJmf5EDV-CKAXw9VHmQiSm2nZqyyGzAgmZvOOWe9c4VI-5MHL3erRdFvNZFZ-zSMF7FvPDuLNn9zDEC9wOkcD0uaosOa4DfZ_1Us0kkwlwOF6S0ifem3Ps45UkNFSZtsVB362t3Bu7ADWE7f36KAH7tZ8zuoh8",
  },
  {
    id: 3,
    title: "The Modern Archive",
    author: "Marcus Wells",
    year: 2022,
    genre: "Reference",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwAcrNwz8-ygNXtx-0acs7KiZUPzOM-VQ789Rv9bcFq9B9LdDayv2D6-ssOrAerW5c5EpB25bG36gqqlvsQEeEsWXUrF7YJl_AD0LN4O20rMJjEIaEAWywHVJIaA9aa1tSQptsMUHW9PKxZiikRfPue4gYQaRsKCqlU8B3f0Udrc24_UmxV_YTdHlsgVB6LWt4V5T44l42KyYauPxrmropy_7EnDScvcbg5cuHAc6LzZc8IWJU8twMBxgxFAjRxdUaXmyroavQ3gA",
  },
  {
    id: 4,
    title: "Spatial Systems",
    author: "Sarah Jenkins",
    year: 2023,
    genre: "Design",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvDzfFBUQJEDwFZUT1Mg7id4kKL7la7A8A4-LbmtiAjkPdybtyMwBD57q9BxLIcdiO_02edNOKXDvgpG0PyIDeR6hA5AWfhCRfVjbWCkOsPs1UOvkwVZjLHvawqQDZOsRlC3UCWUqyo38I9I3auOl2bPOCqIE2QnX8oPP7wrfM2_wvEdeAEy6KlaT4Pd0-Ep1NSjtKFa1ckur6PO7hlIzgN6y6wbj0y5ZwpPtKywkQgiFevJNnnjqq7KIYwMy1M9643LIVizG5CnA",
  },
];

export const circulationData: CirculationItem[] = [
  {
    initials: "JS",
    name: "James Sterling",
    book: "The Art of Knowledge",
    borrowDate: "Jun 04, 2024",
    dueDate: "Jun 18, 2024",
    status: "borrowed",
  },
  {
    initials: "LM",
    name: "Lila Montgomery",
    book: "Spatial Systems",
    borrowDate: "May 28, 2024",
    dueDate: "Jun 11, 2024",
    status: "overdue",
  },
  {
    initials: "AH",
    name: "Arthur Hayes",
    book: "Digital Renaissance",
    borrowDate: "Jun 10, 2024",
    dueDate: "Jun 24, 2024",
    status: "borrowed",
  },
];

export const navItems: NavItem[] = [
  { label: "Dashboard", icon: <FiBarChart2 />, active: true },
  { label: "Inventory", icon: <FiBook />, active: false },
  { label: "Members", icon: <FiUsers />, active: false },
  { label: "Circulation", icon: <FiRefreshCw />, active: false },
  { label: "Reports", icon: <FiTrendingUp />, active: false },
];

export const howItWorksSteps: HowItWorksStep[] = [
  {
    num: "01",
    title: "Join",
    desc: "Create your profile and connect your local library card to our global digital hub.",
  },
  {
    num: "02",
    title: "Browse",
    desc: "Discover titles through curated collections, trending topics, and personalized recs.",
  },
  {
    num: "03",
    title: "Learn",
    desc: "Access resources instantly or visit your branch for a seamless physical pickup.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Elena Ross",
    role: "University Researcher",
    quote:
      "Bookshelf has fundamentally changed how I organize my research. The ability to jump from a digital citation to a physical book reservation is seamless.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDn_JrIB-c71SXiJHgVqIUwQCYQeuRax_gx10mA6by-4ZXIQG97INpFyApKKaa5bY51YQf59ojHaEfa8UWdawFlvvHpnSjUh00mvesNhn_YpIJUQWBsWV4By-cH4BdZ4oCNQf4yIqcFa-gnrgokzOTS2dbogYNBFweDlaSMYs6iwYAHpoyb2_jTrDL7xvoHfp8oFE7AwnOwtahDWAcC7jGeyZgy7GXdZ0ILiDeFtFn_KjrVNdoEu_lavH6_rwkZcwQU3bKVyjNp9yI",
    rating: 5,
    icon: <FaGraduationCap className="text-white text-xl" />,
  },
  {
    name: "Marcus Thorne",
    role: "Chief Librarian, Central City",
    quote:
      "The inventory management is incredible. I've reduced my administrative workload by 40%, allowing me to spend more time curating special collections.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVlqzn7G-0LVuCRgd0LGOl2SJAY7mtB29wn1wz2jXnt7vQy8XxTFNjqB40Z5vpApaeiiYoYBC-ZJHXQD03BHU8kedn5V7E8dCeWGxZxHDeTQsUgwAKuHLpMldU-fb-6VgGfX7dyUxEeAZRe2OEd1LCxMbHC0W-towQWrzxLLJ_TMruvfBA66SvnjEzmr-Z4zv6Ca03sUtcsqvr4PB9Q5OYwOr_o_7XSs2Hz8YorolvaQNtl8QU0k8T06sa0pYtPySlcL4nw_2mGKs",
    rating: 5,
    icon: <FiBook className="text-white text-xl" />,
  },
  {
    name: "Leo Sterling",
    role: "Graduate Student",
    quote:
      "Search results are finally relevant! It feels like the system actually knows what I'm looking for, even across different disciplines.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv3WPOZ7HEzInVcNboEf-IXIIzNc0P_YSAwYdl46MkFRequBMtQ49IDu1e5_e7FjTL6GTtsq7zaoo7m4cbqBZ-hPbcJ0i2pzpMe2jeOroPx_LZu4luopaff1xL2gcdn24sLtMwF-MI7k4HM84QzntlR7CuaFnQdvmYs7G884hOBuxvhcVJlyIIjXmxoXy2yXCZ-eVAZPXnCu6rpqi-3ZobQXR1Rmhhzv5NGAiyqbCyhqaqtB2eFwaJvub5O4gxhQzFlqMVZwv_Hlo",
    rating: 5,
    icon: <FiStar className="text-white text-xl" />,
  },
];

export const catalogBooks: Book[] = [
  {
    id: 1,
    title: "Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    year: 2020,
    status: "available",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpEIIZu1O_scleBw2lmCoOd_8BbY_w0YbVD_N8BSupjWGs5Z7F4OUDO-So0JrrBaxVSNJofhfvO1M1Rvaf2yGAYC7Lnp37Xr88Jovst9fTbLRuu83T3pbIIAaRugdfYh3pFitZ76u9YQ8oBPTggFit6VG3iybFAt965NP69gsOTEKHfcMpvLXf3443-kBBrmO0Q4O_HegnhzWtcA6R3VfZyzau78S8ojLyix9FCV-_QgtyStzCZFXK5HgrOzrWeIYPMCsVB-qT1ZY",
  },
  {
    id: 2,
    title: "Thinking with Type",
    author: "Ellen Lupton",
    genre: "Design",
    year: 2010,
    status: "borrowed",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJkDYJ2fJJYSHxjgcJNRgMONrk94rwU0qR27a-Oq7av9wcKFtYESbFaGhkh0PS_71R4Ykm3sNeP-hWFeZ67YePZ9HIKAmqlj0yXC-DWFQC08nhaG9c8s0_NG-cIPCSu3skJirYxmCkHcV4p4iir4yjiK1Zqoh6O1qG9GnZWRsGz4MIFin6R6C4db1oPMH3wqrHo-smI_5SDkcx5Bis2Su01Elz4ZJwbNfXixf-bP_gfKyA92WulLM_OK_epalUvMpix-O0xKFLnhI",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    year: 2018,
    status: "available",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuG6j8LPf8SNCPeska9Mayz82FZ0dVRow7scOrv-NS3QOdpIyih4l3XwP53_laKRnFCIbTqsGBYLwputEwNweUe94pN0D1DIk60ELnJedB2_J1JwCnKIRN2eOkJOGw7UcSjG2kBal4zrTapMk4h9un9xTILnKQH8NwrE8zoCs-iwUnSwlUY-B1e7c5OxSvBGQZSOd44PwHWC1MVqpFVivHZHmnUYXCQy1ZitZWIsiwmPT9r9Z3JId7HtuzmMlQVyklZKmvV9ddtbA",
  },
  {
    id: 4,
    title: "Digital Minimalism",
    author: "Cal Newport",
    genre: "Technology",
    year: 2019,
    status: "available",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYVad-hpCbzeYopRJA8wtgi9AyLEeGJS76wgjHhsd5GVt8ClbhYJH4MBELcZlM_e8-dfnTnGjjYGjGqzpIvL0mM8J5Fu4rQst_ONrz22T6RMQJILhARN48GgDZgCf-BmJFLk3nrgIStdVNtU3pWUPhxji_2nnmKnYC0ouDzDU6kY0BBH3wepr6TWM2cR-l8JhKHYmgYUMzo0hVhzpXtRN0Rvtd2YSaEt3TiDQjhreOXUYimI63whXrOdsG_93bq9hdEc3SJudTncs",
  },
  {
    id: 5,
    title: "Creative Strategy",
    author: "Douglas Davis",
    genre: "Design",
    year: 2016,
    status: "borrowed",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCRXEmJyYyG8eVznbCKcPjLDMOZwKAgRKCppWGZF5N2TmutnaDUvpQhSYnBZ-vFPUl4vleBPwKGARTwIk4TAxSYbu9fbGos31vR_y_mbaXNpaMnYVL0MZWtPBN5CeLt8mkZnfzQyjncq5UQ7u38f3mgxPbzA2_P2LDx2M1QyrOinLJvw6SrUqHfyrYVT-etdEHgcxwAYrkSdPeOSk7B0NWoKWe63wwHVBIOnFl80JmH_3aH3JF6vYvOdeVKg5gpDeZcKY8ZS3Fyjk",
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    year: 2018,
    status: "available",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuG6j8LPf8SNCPeska9Mayz82FZ0dVRow7scOrv-NS3QOdpIyih4l3XwP53_laKRnFCIbTqsGBYLwputEwNweUe94pN0D1DIk60ELnJedB2_J1JwCnKIRN2eOkJOGw7UcSjG2kBal4zrTapMk4h9un9xTILnKQH8NwrE8zoCs-iwUnSwlUY-B1e7c5OxSvBGQZSOd44PwHWC1MVqpFVivHZHmnUYXCQy1ZitZWIsiwmPT9r9Z3JId7HtuzmMlQVyklZKmvV9ddtbA",
  },
];

export const borrowedBooks:BorrowedBook[] = [
  {
    id: 1,
    title: "Digital Minimalism",
    author: "Cal Newport",
    dueDate: "Nov 24, 2024",
    status: "active",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYVad-hpCbzeYopRJA8wtgi9AyLEeGJS76wgjHhsd5GVt8ClbhYJH4MBELcZlM_e8-dfnTnGjjYGjGqzpIvL0mM8J5Fu4rQst_ONrz22T6RMQJILhARN48GgDZgCf-BmJFLk3nrgIStdVNtU3pWUPhxji_2nnmKnYC0ouDzDU6kY0BBH3wepr6TWM2cR-l8JhKHYmgYUMzo0hVhzpXtRN0Rvtd2YSaEt3TiDQjhreOXUYimI63whXrOdsG_93bq9hdEc3SJudTncs",
  },
  {
    id: 2,
    title: "Creative Strategy",
    author: "Douglas Davis",
    dueDate: "Oct 12, 2024",
    status: "overdue",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCRXEmJyYyG8eVznbCKcPjLDMOZwKAgRKCppWGZF5N2TmutnaDUvpQhSYbu9fbGos31vR_y_mbaXNpaMnYVL0MZWtPBN5CeLt8mkZnfzQyjncq5OQ7ujyZozpZCSu..",
  },
];