import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const initialItems = [
    {
      _id: '60d0fe4f5311236168a109d1',
      title: 'iPhone 13 (Midnight Blue)',
      category: 'Mobile',
      type: 'Lost',
      description: 'Lost near Central Library staircase around 2 PM. Has a clear transparent case with cardholder.',
      location: 'Central Library',
      date: '2025-08-10',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
      status: 'Lost',
      reporterName: 'Student Member',
      reporterEmail: 'student@dypcet.ac.in'
    },
    {
      _id: '60d0fe4f5311236168a109d2',
      title: 'Black Laptop Backpack',
      category: 'Backpack',
      type: 'Found',
      description: 'Found on bench near Canteen lawn. Contains Dell charger, CSE notebook, and water bottle.',
      location: 'Canteen Lawn',
      date: '2025-08-08',
      image: '/backpack.png',
      status: 'Found',
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
      date: '2025-08-06',
      image: '/wallet.png',
      status: 'Pending Claim',
      reporterName: 'Rahul Patil',
      reporterEmail: 'rahul@gmail.com'
    },
    {
      _id: '60d0fe4f5311236168a109d4',
      title: 'Honda Bike Keys',
      category: 'Keys',
      type: 'Found',
      description: 'Key chain with blue rubber dolphin attached. Found near Parking Lot B.',
      location: 'Parking Lot B',
      date: '2025-08-04',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=600',
      status: 'Returned',
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
      date: '2025-08-05',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
      status: 'Found',
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
      date: '2025-08-03',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
      status: 'Found',
      reporterName: 'Rahul Patil',
      reporterEmail: 'rahul@gmail.com'
    }
  ];

  const initialClaims = [
    {
      _id: '60d0fe4f5311236168a109e1',
      itemTitle: 'Leather Wallet (Brown)',
      category: 'Wallet',
      claimedBy: 'Student Member',
      claimerEmail: 'student@dypcet.ac.in',
      date: '2025-08-10',
      status: 'Pending',
      proofDetails: 'College ID card inside matches my department records.'
    },
    {
      _id: '60d0fe4f5311236168a109e2',
      itemTitle: 'Honda Bike Keys',
      category: 'Keys',
      claimedBy: 'Rahul Patil',
      claimerEmail: 'rahul@gmail.com',
      date: '2025-08-06',
      status: 'Approved',
      proofDetails: 'Key number MH09-4521 with dolphin keychain.'
    },
    {
      _id: '60d0fe4f5311236168a109e3',
      itemTitle: 'iPhone 13 (Midnight Blue)',
      category: 'Mobile',
      claimedBy: 'Amit Deshmukh',
      claimerEmail: 'amit@gmail.com',
      date: '2025-08-06',
      status: 'Rejected',
      proofDetails: 'Lost my blue phone near canteen.'
    },
    {
      _id: '60d0fe4f5311236168a109e4',
      itemTitle: 'Black Laptop Backpack',
      category: 'Backpack',
      claimedBy: 'Priya Sharma',
      claimerEmail: 'priya@gmail.com',
      date: '2025-08-04',
      status: 'Pending',
      proofDetails: 'Contains Dell charger and CSE 3rd sem notes.'
    }
  ];

  const initialNotifications = [
    {
      _id: 'notif_1',
      message: 'Your claim request has been approved by Campus Admin.',
      time: '2 hours ago',
      type: 'success',
      isRead: false
    },
    {
      _id: 'notif_2',
      message: 'A new claim request for Black Backpack was submitted.',
      time: '5 hours ago',
      type: 'info',
      isRead: false
    },
    {
      _id: 'notif_3',
      message: 'Your item has been returned successfully.',
      time: '1 day ago',
      type: 'success',
      isRead: true
    }
  ];

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('dypcet_items');
    return saved ? JSON.parse(saved) : initialItems;
  });

  const [claims, setClaims] = useState(() => {
    const saved = localStorage.getItem('dypcet_claims');
    return saved ? JSON.parse(saved) : initialClaims;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('dypcet_notifs');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  useEffect(() => {
    localStorage.setItem('dypcet_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('dypcet_claims', JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem('dypcet_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('/api/items');
        if (res.data && res.data.length > 0) {
          setItems(res.data);
        }
      } catch (err) {
        // fallback
      }
    };
    fetchItems();
  }, []);

  const addItem = async (itemData) => {
    try {
      const formData = new FormData();
      Object.keys(itemData).forEach((key) => {
        formData.append(key, itemData[key]);
      });
      const res = await axios.post('/api/items', formData);
      setItems((prev) => [res.data, ...prev]);
    } catch (err) {
      const newItem = {
        _id: 'item_' + Date.now(),
        ...itemData,
        date: itemData.date || new Date().toISOString().split('T')[0],
        status: itemData.type === 'Lost' ? 'Lost' : 'Found',
        image: itemData.imagePreview || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600'
      };
      setItems((prev) => [newItem, ...prev]);
    }
  };

  const submitClaim = async (claimData) => {
    try {
      const res = await axios.post('/api/claims', claimData);
      setClaims((prev) => [res.data, ...prev]);
    } catch (err) {
      const newClaim = {
        _id: 'claim_' + Date.now(),
        itemTitle: claimData.itemTitle || 'Item',
        category: claimData.category || 'General',
        claimedBy: claimData.claimerName || 'Student User',
        claimerEmail: claimData.claimerEmail || 'student@dypcet.ac.in',
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
        proofDetails: claimData.proofDetails
      };
      setClaims((prev) => [newClaim, ...prev]);

      if (claimData.itemId) {
        setItems((prev) =>
          prev.map((item) =>
            item._id === claimData.itemId ? { ...item, status: 'Pending Claim' } : item
          )
        );
      }
    }
  };

  const updateClaimStatus = (claimId, newStatus) => {
    setClaims((prev) =>
      prev.map((claim) => {
        if (claim._id === claimId) {
          return { ...claim, status: newStatus };
        }
        return claim;
      })
    );

    const targetClaim = claims.find((c) => c._id === claimId);
    if (targetClaim) {
      setItems((prev) =>
        prev.map((item) => {
          if (item.title === targetClaim.itemTitle || item._id === targetClaim.itemId) {
            return {
              ...item,
              status: newStatus === 'Approved' ? 'Returned' : 'Found'
            };
          }
          return item;
        })
      );

      const notifMsg =
        newStatus === 'Approved'
          ? `Your claim for ${targetClaim.itemTitle} has been approved.`
          : `Your claim for ${targetClaim.itemTitle} was rejected.`;

      setNotifications((prev) => [
        {
          _id: 'notif_' + Date.now(),
          message: notifMsg,
          time: 'Just now',
          type: newStatus === 'Approved' ? 'success' : 'warning',
          isRead: false
        },
        ...prev
      ]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        items,
        claims,
        notifications,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        addItem,
        submitClaim,
        updateClaimStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
