import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, Calendar, CheckCircle2, HeartHandshake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const ReportFoundItemPage = () => {
  const { addItem } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Backpack',
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
      type: 'Found',
      reporterName: user?.name || 'Student',
      reporterEmail: user?.email || 'student@gmail.com'
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard/found-items');
    }, 1500);
  };

  return (
    <div className="space-y-8">

      <div className="border-b-2 border-ink pb-6">
        <span className="chip chip-moss">Form F-01</span>
        <h1 className="font-display font-extrabold text-5xl leading-none mt-3">Report Found Item</h1>
        <p className="text-ink-soft mt-3">
          Found an item on campus? Help us reunite it with its rightful owner.
        </p>
      </div>

      {submitted ? (
        <div className="sheet bg-moss-soft p-10 text-center space-y-3 max-w-2xl">
          <CheckCircle2 className="w-14 h-14 text-moss mx-auto" />
          <h3 className="font-display font-bold text-2xl">Found Item Reported Successfully!</h3>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">Redirecting to found items discovery page...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Side note — left this time */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-moss text-card border-2 border-ink shadow-[6px_6px_0_#15130e] p-6 space-y-4 -rotate-1">
            <div className="w-12 h-12 bg-saffron text-ink border-2 border-ink flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-display font-extrabold text-3xl leading-tight">Together we can <span className="italic text-saffron">reunite!</span></h3>
            <p className="text-sm text-card/85 leading-relaxed">
              Your report helps students quickly identify their lost items. Once submitted, the owner can view details and submit a claim verification.
            </p>
            <div className="pt-4 border-t-2 border-dashed border-card/50 font-mono text-[11px] uppercase tracking-wider text-card/70">
              Campus Security & Admin Desk will verify claim proofs before releasing items.
            </div>
          </aside>

          {/* Main Form */}
          <div className="lg:col-span-8 sheet p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">Item Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Blue Canvas Backpack"
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
                    <option value="Backpack">Backpack</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Electronics">Electronics</option>
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

              <div>
                <label className="field-label">Description *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Where you found it, specific features, condition, or items inside..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="field resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">Location Found *</label>
                  <div className="relative">
                    <MapPin className="field-ico" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sports Hall, Bench near Canteen"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="field field-icon"
                    />
                  </div>
                </div>

                <div>
                  <label className="field-label">Date Found *</label>
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

              <div>
                <label className="field-label">Upload Photo (Optional)</label>
                <div className="border-2 border-dashed border-ink hover:bg-moss-soft p-6 text-center transition-colors bg-paper">
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
                      <p className="font-mono text-xs uppercase tracking-wider">Click to upload image</p>
                      <p className="text-[11px] text-ink-soft">Supported: JPG, PNG, WEBP</p>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-moss btn-block !py-4">
                Submit Found Item Report
              </button>

            </form>
          </div>

        </div>
      )}

    </div>
  );
};

export default ReportFoundItemPage;
