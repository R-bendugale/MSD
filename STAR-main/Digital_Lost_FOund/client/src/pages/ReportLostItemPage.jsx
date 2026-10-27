import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const ReportLostItemPage = () => {
  const { addItem } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Mobile',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    imagePreview: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({
      ...formData,
      type: 'Lost',
      reporterName: user?.name || 'Student',
      reporterEmail: user?.email || 'student@gmail.com'
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard/lost-items');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-clay">Form L-01</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Report Lost Item</h1>
        <p className="text-ink-soft mt-3">
          Fill in the details about the item you lost on campus to notify everyone.
        </p>
      </div>

      {submitted ? (
        <div className="sheet bg-moss-soft p-10 text-center space-y-3">
          <CheckCircle2 className="w-14 h-14 text-moss mx-auto" />
          <h3 className="font-display font-bold text-2xl">Lost Item Reported Successfully!</h3>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Redirecting to lost items feed...</p>
        </div>
      ) : (
        <div className="sheet p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="field-label">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 13 (Midnight Blue)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="field"
                />
              </div>

              <div>
                <label className="field-label">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="field"
                >
                  <option value="Mobile">Mobile</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Backpack">Backpack</option>
                  <option value="Bag">Bag</option>
                  <option value="Wallet">Wallet</option>
                  <option value="Books">Books</option>
                  <option value="Keys">Keys</option>
                  <option value="Spectacles">Spectacles</option>
                  <option value="ID Card">ID Card</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="field-label">Description *</label>
              <textarea
                required
                rows="4"
                placeholder="Describe specific features, brand, color, contents inside, or distinguishing marks..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="field resize-none"
              ></textarea>
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="field-label">Location Lost *</label>
                <div className="relative">
                  <MapPin className="field-ico" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Central Library, Canteen Lawn, Lab 3"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="field field-icon"
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Date Lost *</label>
                <div className="relative">
                  <Calendar className="field-ico" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="field field-icon"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Box */}
            <div>
              <label className="field-label">Upload Photo (Optional)</label>
              <div className="border-2 border-dashed border-ink hover:bg-saffron-soft p-6 text-center transition-colors bg-paper">
                {formData.imagePreview ? (
                  <div className="space-y-3">
                    <img src={formData.imagePreview} alt="Preview" className="max-h-48 mx-auto border-2 border-ink shadow-[4px_4px_0_#15130e]" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imagePreview: '' })}
                      className="font-mono text-[11px] uppercase tracking-wider text-clay underline underline-offset-4"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 mx-auto" />
                    <p className="font-mono text-xs uppercase tracking-wider">Click to upload image (JPG, PNG)</p>
                    <p className="text-[11px] text-ink-soft">Max size: 5MB</p>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-clay btn-block !py-4">
              Submit Lost Item Report
            </button>

          </form>
        </div>
      )}

    </div>
  );
};

export default ReportLostItemPage;
