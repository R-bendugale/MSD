const bcrypt = require('bcryptjs');

const seedUsers = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'Shweta Tanaji Kolekar',
    department: 'CSE',
    className: 'B.Tech',
    rollNo: '29',
    batch: 'B2',
    email: 'shweta@gmail.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    joinedDate: '2025-08-10'
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'Sneha More',
    department: 'CSE',
    className: 'B.Tech',
    rollNo: '45',
    batch: 'B2',
    email: 'sneha@gmail.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    joinedDate: '2025-08-12'
  },
  {
    _id: '60d0fe4f5311236168a109cc',
    name: 'Rahul Patil',
    department: 'ETC',
    className: 'T.Y.',
    rollNo: '18',
    batch: 'A1',
    email: 'rahul@gmail.com',
    password: 'password123',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    joinedDate: '2025-08-15'
  },
  {
    _id: '60d0fe4f5311236168a109cd',
    name: 'Campus Admin',
    department: 'Administration',
    className: 'Staff',
    rollNo: 'ADM-01',
    batch: 'ADM',
    email: 'admin@dypcet.ac.in',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    joinedDate: '2025-01-01'
  }
];

const seedItems = [
  {
    _id: '60d0fe4f5311236168a109d1',
    title: 'iPhone 13 (Midnight Blue)',
    category: 'Mobile',
    type: 'Lost',
    description: 'Lost near Central Library staircase around 2 PM. Has a clear transparent case with cardholder.',
    location: 'Central Library',
    date: '2025-08-10T14:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    status: 'Lost',
    reportedBy: '60d0fe4f5311236168a109ca',
    reporterName: 'Shweta Tanaji Kolekar',
    reporterEmail: 'shweta@gmail.com'
  },
  {
    _id: '60d0fe4f5311236168a109d2',
    title: 'Black Laptop Backpack',
    category: 'Backpack',
    type: 'Found',
    description: 'Found on bench near Canteen lawn. Contains Dell charger, CSE notebook, and water bottle.',
    location: 'Canteen Lawn',
    date: '2025-08-08T11:30:00.000Z',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    status: 'Found',
    reportedBy: '60d0fe4f5311236168a109cb',
    reporterName: 'Sneha More',
    reporterEmail: 'sneha@gmail.com'
  },
  {
    _id: '60d0fe4f5311236168a109d3',
    title: 'Leather Wallet (Brown)',
    category: 'Wallet',
    type: 'Found',
    description: 'Brown Wildhorn leather wallet found in Computer Lab 3. Contains College ID card.',
    location: 'Computer Lab 3',
    date: '2025-08-06T16:15:00.000Z',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600',
    status: 'Pending Claim',
    reportedBy: '60d0fe4f5311236168a109cc',
    reporterName: 'Rahul Patil',
    reporterEmail: 'rahul@gmail.com'
  },
  {
    _id: '60d0fe4f5311236168a109d4',
    title: 'Honda Bike Keys',
    category: 'Keys',
    type: 'Returned',
    description: 'Key chain with blue rubber dolphin attached. Found near Parking Lot B.',
    location: 'Parking Lot B',
    date: '2025-08-04T09:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600',
    status: 'Returned',
    reportedBy: '60d0fe4f5311236168a109cb',
    reporterName: 'Sneha More',
    reporterEmail: 'sneha@gmail.com'
  },
  {
    _id: '60d0fe4f5311236168a109d5',
    title: 'Reading Spectacles in Blue Case',
    category: 'Spectacles',
    type: 'Found',
    description: 'Black rimmed rayban glasses in navy blue protective case.',
    location: 'Auditorium Hall',
    date: '2025-08-05T15:45:00.000Z',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
    status: 'Found',
    reportedBy: '60d0fe4f5311236168a109cd',
    reporterName: 'Campus Admin',
    reporterEmail: 'admin@dypcet.ac.in'
  },
  {
    _id: '60d0fe4f5311236168a109d6',
    title: 'Stainless Steel Water Bottle',
    category: 'Others',
    type: 'Found',
    description: 'Milton 1L silver insulated water bottle left in Seminar Hall 2.',
    location: 'Seminar Hall 2',
    date: '2025-08-03T17:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
    status: 'Found',
    reportedBy: '60d0fe4f5311236168a109cc',
    reporterName: 'Rahul Patil',
    reporterEmail: 'rahul@gmail.com'
  }
];

const seedClaims = [
  {
    _id: '60d0fe4f5311236168a109e1',
    item: '60d0fe4f5311236168a109d3',
    claimedBy: '60d0fe4f5311236168a109ca',
    claimerName: 'Shweta Tanaji Kolekar',
    claimerEmail: 'shweta@gmail.com',
    proofDetails: 'My college ID card inside has Roll No 29 CSE B.Tech. Wallet has a small tear on inner pocket.',
    status: 'Pending',
    claimDate: '2025-08-07T10:00:00.000Z'
  },
  {
    _id: '60d0fe4f5311236168a109e2',
    item: '60d0fe4f5311236168a109d4',
    claimedBy: '60d0fe4f5311236168a109cc',
    claimerName: 'Rahul Patil',
    claimerEmail: 'rahul@gmail.com',
    proofDetails: 'Key number is MH09-4521 registered under my name. Key ring has a dolphin keychain.',
    status: 'Approved',
    adminNotes: 'Verified bike RC document and student ID matched.',
    claimDate: '2025-08-04T12:00:00.000Z'
  }
];

const seedNotifications = [
  {
    _id: '60d0fe4f5311236168a109f1',
    user: '60d0fe4f5311236168a109ca',
    message: 'Your claim for Leather Wallet (Brown) is pending admin verification.',
    type: 'info',
    isRead: false,
    date: '2025-08-07T10:05:00.000Z'
  },
  {
    _id: '60d0fe4f5311236168a109f2',
    user: '60d0fe4f5311236168a109ca',
    message: 'Your lost report "iPhone 13 (Midnight Blue)" was published to campus feed.',
    type: 'success',
    isRead: true,
    date: '2025-08-10T14:10:00.000Z'
  }
];

module.exports = { seedUsers, seedItems, seedClaims, seedNotifications };
