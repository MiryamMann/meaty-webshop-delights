
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Save, Bot, MessageSquare } from 'lucide-react';

interface Recipe {
  id: string;
  keywords: string;
  response: string;
}

interface StoreDetails {
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  description: string;
}

const BotManagement = () => {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>({
    name: 'החנות שלנו',
    address: 'רחוב הראשי 123, מרכז העיר',
    phone: '03-1234567',
    email: 'help@ourstore.com',
    hours: 'ראשון-חמישי: 9:00-20:00, שישי: 9:00-14:00',
    description: 'חנות ידידותית עם מגוון רחב של מוצרים איכותיים'
  });

  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: '1',
      keywords: 'שעות, פתוח, זמן',
      response: 'אנחנו פתוחים מיום ראשון עד חמישי מ-9:00 עד 20:00, ובימי שישי מ-9:00 עד 14:00. אנחנו כאן כדי לשרת אותך! 🕒'
    },
    {
      id: '2',
      keywords: 'מיקום, כתובת, איפה',
      response: 'אתה יכול למצוא אותנו ברחוב הראשי 123, במרכז העיר. אנחנו ממש ליד בית הקפה עם הסוכך הכחול! 📍'
    }
  ]);

  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: '',
    keywords: '',
    response: ''
  });

  const handleStoreDetailsChange = (field: keyof StoreDetails, value: string) => {
    setStoreDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addRecipe = () => {
    if (newRecipe.keywords.trim() && newRecipe.response.trim()) {
      setRecipes(prev => [...prev, {
        ...newRecipe,
        id: Date.now().toString()
      }]);
      setNewRecipe({ id: '', keywords: '', response: '' });
    }
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const updateRecipe = (id: string, field: keyof Recipe, value: string) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === id ? { ...recipe, [field]: value } : recipe
    ));
  };

  const saveConfiguration = () => {
    console.log('Saving configuration:', { storeDetails, recipes });
    alert('הגדרות נשמרו בהצלחה!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">ניהול הצ'אטבוט</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Store Details */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-blue-600" />
              פרטי החנות
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">שם החנות</label>
                <input
                  type="text"
                  value={storeDetails.name}
                  onChange={(e) => handleStoreDetailsChange('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">כתובת</label>
                <input
                  type="text"
                  value={storeDetails.address}
                  onChange={(e) => handleStoreDetailsChange('address', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">טלפון</label>
                  <input
                    type="text"
                    value={storeDetails.phone}
                    onChange={(e) => handleStoreDetailsChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">אימייל</label>
                  <input
                    type="email"
                    value={storeDetails.email}
                    onChange={(e) => handleStoreDetailsChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">שעות פעילות</label>
                <input
                  type="text"
                  value={storeDetails.hours}
                  onChange={(e) => handleStoreDetailsChange('hours', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">תיאור החנות</label>
                <Textarea
                  value={storeDetails.description}
                  onChange={(e) => handleStoreDetailsChange('description', e.target.value)}
                  className="w-full min-h-[100px]"
                />
              </div>
            </div>
          </Card>

          {/* Bot Responses */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">תגובות הבוט</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <label className="block text-sm font-medium">מילות מפתח (מופרדות בפסיקים)</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRecipe(recipe.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <input
                    type="text"
                    value={recipe.keywords}
                    onChange={(e) => updateRecipe(recipe.id, 'keywords', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-3 text-sm"
                    placeholder="לדוגמה: שעות, פתוח, זמן"
                  />
                  
                  <label className="block text-sm font-medium mb-2">תגובת הבוט</label>
                  <Textarea
                    value={recipe.response}
                    onChange={(e) => updateRecipe(recipe.id, 'response', e.target.value)}
                    className="w-full min-h-[80px] text-sm"
                    placeholder="התגובה שהבוט יחזיר כשמוזכרות מילות המפתח"
                  />
                </div>
              ))}
            </div>

            {/* Add New Recipe */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <h3 className="font-medium mb-3">הוסף תגובה חדשה</h3>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={newRecipe.keywords}
                  onChange={(e) => setNewRecipe(prev => ({ ...prev, keywords: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="מילות מפתח (מופרדות בפסיקים)"
                />
                
                <Textarea
                  value={newRecipe.response}
                  onChange={(e) => setNewRecipe(prev => ({ ...prev, response: e.target.value }))}
                  className="w-full min-h-[80px] text-sm"
                  placeholder="תגובת הבוט"
                />
                
                <Button onClick={addRecipe} className="w-full">
                  <Plus className="h-4 w-4 ml-2" />
                  הוסף תגובה
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-center">
          <Button onClick={saveConfiguration} size="lg" className="px-8">
            <Save className="h-5 w-5 ml-2" />
            שמור הגדרות
          </Button>
        </div>

        {/* Preview Section */}
        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">תצוגה מקדימה</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              הבוט יזהה את מילות המפתח הבאות ויחזיר את התגובות המתאימות:
            </p>
            <div className="space-y-2">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="text-sm">
                  <strong>מילות מפתח:</strong> {recipe.keywords} → 
                  <span className="text-blue-600"> {recipe.response.substring(0, 50)}...</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BotManagement;
