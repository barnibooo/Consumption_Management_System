# 🧪 Consumption Management System (CMS) - Tesztelés

![Testing](ReadmeImages/Testing.png)

A *testing* branch tartalmazza a Consumption Management System (CMS) projekt automatikus tesztjeit, mind frontend, mind backend oldalon.  
Cél: a rendszer megbízhatóságának és stabilitásának biztosítása.

---

## 📂 Tesztkörnyezet

- **Frontend tesztek**: `CMSReact/src/_tests_` (Jest)
- **Backend tesztek**: `CMS.Tests` (xUnit)

---

## 🎯 Frontend tesztelés (Jest)

A frontend tesztek a [Jest](https://jestjs.io/) keretrendszerrel készültek, egység- és integrációs tesztek formájában.

### Tesztelés lépései:

1.  A frontend mappába megnyitása:
  ` cd CMSReact/src/__tests__`
2. Teszt futtatása
   `npx jest`
3. Teszt eredménye<br />
![Testing](/ReadmeImages/frontendpassed.png)   

## 🎯 Backend tesztelés (xUnit)

A backend tesztek az [xUnit](https://xunit.net/) keretrendszerrel készültek az ASP.NET Core Web API projekthez.

### Tesztelés lépései:

1. Nyisd meg a projekt fő megoldásfájlját (`CMS.sln`) a Visual Studio alkalmazásban.

2. A menüsorban válaszd ki a **Test** menüt, majd kattints a **Test Explorer** opcióra.

3. A megnyíló **Test Explorer** ablakban kattints a **Run All Tests** gombra a tesztek futtatásához.

4. A tesztek eredménye megjelenik a Test Explorer-ben.  
   Példa egy sikeres tesztfutás eredményére:<br />

   ![Backend Testing](ReadmeImages/backendpassed.png)


