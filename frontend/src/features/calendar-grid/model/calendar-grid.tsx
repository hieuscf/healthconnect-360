export const getEventColor = (type: string) => {
    switch (type) {
      case 'appointment': return 'bg-blue-100 border-l-4 border-blue-500 text-blue-800';
      case 'surgery': return 'bg-red-100 border-l-4 border-red-500 text-red-800';
      case 'meeting': return 'bg-green-100 border-l-4 border-green-500 text-green-800';
      case 'emergency': return 'bg-orange-100 border-l-4 border-orange-500 text-orange-800';
      case 'break': return 'bg-gray-100 border-l-4 border-gray-500 text-gray-800';
      default: return 'bg-gray-100 border-l-4 border-gray-500 text-gray-800';
    }
  };

