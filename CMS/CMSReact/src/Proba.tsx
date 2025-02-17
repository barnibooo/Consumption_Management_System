import { useEffect, useState } from "react";
import axios from "axios";

// Menü elem típus
interface MenuItem {
  itemId: number;
  name: string;
  category: string;
  price: number;
  description: string;
  isAvailable: boolean;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // Menü elemek típusa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://localhost:5000/api/MenuItems") // Cseréld ki az API végpontot!
      .then((response) => {
        console.log(response.data); // Naplózza a teljes választ, hogy lássuk, mi érkezik
        if (Array.isArray(response.data)) {
          // Ha az adat egy tömb
          setMenuItems(response.data); // A válasz tömböt közvetlenül beállítjuk
        } else {
          console.error("Hibás API válasz: nem tömb", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba történt:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Adatok betöltése...</p>;
  if (error) return <p>Hiba történt: {error}</p>;

  var l = menuItems.length;

  // Az egyedi kategóriák meghatározása for ciklussal
  const getUniqueCategories = () => {
    const categories: string[] = []; // A kategóriákat tartalmazó tömb

    // Végigiterálunk az items tömbön és hozzáadjuk a kategóriákat a categories tömbhöz
    for (let i = 0; i < l; i++) {
      const category = menuItems[i].category;
      // Csak akkor adjuk hozzá a kategóriát, ha még nincs benne a categories tömbben
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
    return categories;
  };

  const uniqueCategories = getUniqueCategories();

  // Kategóriák elemeinek megszámlálása
  const countItemsInCategories = () => {
    const categoryCounts: { [key: string]: number } = {};
    menuItems.forEach((item) => {
      if (categoryCounts[item.category]) {
        categoryCounts[item.category]++;
      } else {
        categoryCounts[item.category] = 1;
      }
    });
    return categoryCounts;
  };

  const categoryCounts = countItemsInCategories();

  return (
    <div>
      <h1>Étlap</h1>
      <p>Összesen {l} elem található az étlapon.</p>
      <ul>
        {menuItems.map((item) => (
          <li key={item.itemId}>
            <strong>{item.name}</strong> - {item.price} Ft
          </li>
        ))}
      </ul>
      <h2>Kategóriák</h2>
      <ul>
        {uniqueCategories.map((category) => (
          <li key={category}>
            <strong>{category}</strong> - {categoryCounts[category]} elem
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
