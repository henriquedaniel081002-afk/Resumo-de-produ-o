<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1KQHo6zwCeQ498srYTuWt-pzd48SUzBrT

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Opcional) Alimente o dashboard com seus dados reais:
   - Crie a pasta `public/` (se não existir)
   - Coloque seu arquivo **JSON** em: `public/production.json`
   - Formato esperado: um **array** de objetos com as chaves
     `Data` (YYYY-MM-DD), `Cod`, `Desc`, `Mp`, `Qtde`, `Turno` ("1º Turno" | "2º Turno")
3. Run the app:
   `npm run dev`

### Observações
- Se `public/production.json` não estiver disponível ou estiver inválido, o app entra automaticamente em modo **MOCK** (dados de exemplo) e mostra um aviso no topo.
