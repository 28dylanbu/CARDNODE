import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, Image as ImageIcon, Check, X } from 'lucide-react';
import { verbs, Verb, saveNewVerb, updateVerb } from '../data/verbsData';
import { getCurrentUser } from '../utils/auth';

export default function VerbEditor() {
  const navigate = useNavigate();
  const { verbId } = useParams<{ verbId: string }>();
  const user = getCurrentUser();

  const isNew = verbId === 'new';
  const existingVerb = isNew ? null : verbs.find((v) => v.id === parseInt(verbId || '0'));

  const [formData, setFormData] = useState({
    infinitive: existingVerb?.infinitive || '',
    imageUrl: existingVerb?.imageUrl || '',
    present: existingVerb?.present || '',
    past: existingVerb?.past || '',
    future: existingVerb?.future || '',
    examplePresent: existingVerb?.examplePresent.join(' ') || '',
    examplePast: existingVerb?.examplePast.join(' ') || '',
    exampleFuture: existingVerb?.exampleFuture.join(' ') || '',
  });

  const [saved, setSaved] = useState(false);

  // RECUPERAMOS EL ESTADO DE LA IMAGEN
  const [imagePreview, setImagePreview] = useState<string | null>(existingVerb?.imageUrl || null);

  if (!user || user.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setSaved(false);
  };

  // RECUPERAMOS EL PROCESADOR DE IMÁGENES
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (jpg, png, jpeg).');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        handleChange('imageUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // AQUÍ ESTÁ LA MAGIA: EL GUARDADO REAL
  const handleSave = () => {
    const newVerbData = {
      infinitive: formData.infinitive.toLowerCase().trim(),
      imageUrl: formData.imageUrl,
      present: formData.present.toLowerCase().trim(),
      past: formData.past.toLowerCase().trim(),
      future: formData.future.toLowerCase().trim(),
      examplePresent: formData.examplePresent.trim().split(/\s+/),
      examplePast: formData.examplePast.trim().split(/\s+/),
      exampleFuture: formData.exampleFuture.trim().split(/\s+/)
    };

    if (isNew) {
      // Si entramos por el botón "Add New"
      saveNewVerb(newVerbData);
    } else if (existingVerb) {
      // Si entramos por el botón "Edit"
      updateVerb(existingVerb.id, newVerbData);
    }

    setSaved(true);

    setTimeout(() => {
      window.location.href = '/admin';
    }, 2000);
  };

  const isValid = () => {
    return (
        formData.infinitive.trim() &&
        formData.imageUrl.trim() &&
        formData.present.trim() &&
        formData.past.trim() &&
        formData.future.trim() &&
        formData.examplePresent.trim() &&
        formData.examplePast.trim() &&
        formData.exampleFuture.trim()
    );
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
              <span className="text-white font-bold">Back to Panel</span>
            </button>

            <h1 className="text-white text-3xl font-black">
              {isNew ? 'New Verb' : `Edit: ${existingVerb?.infinitive}`}
            </h1>

            <button
                onClick={handleSave}
                disabled={!isValid() || saved}
                className="flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-xl border border-white/20 transition-all"
            >
              <Save className="w-5 h-5 text-white" />
              <span className="text-white font-bold">{saved ? 'Saved!' : 'Save'}</span>
            </button>
          </div>

          {/* Success Message */}
          {saved && (
              <div className="mb-8 bg-green-500/20 border border-green-400/50 rounded-2xl p-6 flex items-center gap-4">
                <Check className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-green-300 font-black text-xl">Saved successfully!</h3>
                  <p className="text-green-400">Changes have been saved. Redirecting...</p>
                </div>
              </div>
          )}

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">

            <div className="mb-8">
              <h2 className="text-white text-2xl font-black mb-6">Basic Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 font-bold mb-2">English Verb *</label>
                  <input
                      type="text"
                      value={formData.infinitive}
                      onChange={(e) => handleChange('infinitive', e.target.value)}
                      placeholder="eat, run, swim..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* INTERFAZ DEL EXPLORADOR DE ARCHIVOS RECUPERADA */}
            <div className="mb-8">
              <h2 className="text-white text-2xl font-black mb-6">Image</h2>
              <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-48 h-48 bg-[#0f172a] rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed border-white/30 relative flex-shrink-0 shadow-inner">
                  {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="w-12 h-12 text-gray-500 mb-2" />
                        <span className="text-gray-500 text-sm font-bold">No image</span>
                      </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <label className="block text-gray-300 font-bold mb-4">Upload Verb Image *</label>
                  <label className="cursor-pointer inline-flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                    <ImageIcon className="w-5 h-5" />
                    <span>Explorar archivos...</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  <p className="text-gray-400 text-sm mt-4">
                    💡 Selecciona una imagen de tu computadora. Se procesará y guardará automáticamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Verb Forms */}
            <div className="mb-8">
              <h2 className="text-white text-2xl font-black mb-6">Verb Forms</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-green-300 font-bold mb-2">Present *</label>
                  <input
                      type="text"
                      value={formData.present}
                      onChange={(e) => handleChange('present', e.target.value)}
                      placeholder="eat/eats"
                      className="w-full px-4 py-3 bg-green-500/10 border border-green-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300 font-bold mb-2">Past *</label>
                  <input
                      type="text"
                      value={formData.past}
                      onChange={(e) => handleChange('past', e.target.value)}
                      placeholder="ate"
                      className="w-full px-4 py-3 bg-yellow-500/10 border border-yellow-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 font-bold mb-2">Future *</label>
                  <input
                      type="text"
                      value={formData.future}
                      onChange={(e) => handleChange('future', e.target.value)}
                      placeholder="will eat"
                      className="w-full px-4 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Example Sentences */}
            <div>
              <h2 className="text-white text-2xl font-black mb-6">Example Sentences</h2>
              <p className="text-gray-400 mb-4">Write words separated by spaces. They will be used for the sentence builder.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-green-300 font-bold mb-2">Present Example *</label>
                  <input
                      type="text"
                      value={formData.examplePresent}
                      onChange={(e) => handleChange('examplePresent', e.target.value)}
                      placeholder="I eat pizza every day"
                      className="w-full px-4 py-3 bg-green-500/10 border border-green-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-yellow-300 font-bold mb-2">Past Example *</label>
                  <input
                      type="text"
                      value={formData.examplePast}
                      onChange={(e) => handleChange('examplePast', e.target.value)}
                      placeholder="I ate pizza yesterday"
                      className="w-full px-4 py-3 bg-yellow-500/10 border border-yellow-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 font-bold mb-2">Future Example *</label>
                  <input
                      type="text"
                      value={formData.exampleFuture}
                      onChange={(e) => handleChange('exampleFuture', e.target.value)}
                      placeholder="I will eat pizza tomorrow"
                      className="w-full px-4 py-3 bg-purple-500/10 border border-purple-400/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          {!isValid() && (
              <div className="mt-8 bg-yellow-500/20 border border-yellow-400/50 rounded-2xl p-6 flex items-center gap-4">
                <X className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-yellow-300 font-black text-xl">Incomplete Fields</h3>
                  <p className="text-yellow-400">Please complete all fields marked with * before saving.</p>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}