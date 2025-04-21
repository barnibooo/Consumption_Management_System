import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { ConsumptionItem } from "./CustomerCheckout";

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100%",
    border: "none",
    maxWidth: "100vw",
    maxHeight: "100vh",
  },
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  section: {
    margin: 3,
    padding: 3,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  header: {
    fontSize: 12,
    marginBottom: 8,
  },
  item: {
    marginBottom: 6,
    padding: 6,
    borderBottom: "1 solid #CCCCCC",
  },
  text: {
    fontSize: 8,
    marginBottom: 3,
  },
  total: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});

interface ConsumptionPDFProps {
  customer: {
    name: string;
    customerId: number;
  };
  consumption: ConsumptionItem[];
  totalAmount: number;
}

const ConsumptionPDF = ({
  customer,
  consumption,
  totalAmount,
}: ConsumptionPDFProps) => (
  <PDFViewer style={styles.viewer}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Fogyasztási bizonylat</Text>
          <Text style={styles.header}>
            {customer.name} (#{customer.customerId})
          </Text>

          {consumption.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.text}>Termék: {item.productName}</Text>
              <Text style={styles.text}>Leírás: {item.description}</Text>
              <Text style={styles.text}>Mennyiség: {item.quantity}</Text>
              <Text style={styles.text}>Ár: {item.price} Ft</Text>
              <Text style={styles.text}>
                Rendelés ideje:{" "}
                {new Date(item.orderDate).toLocaleString("hu-HU")}
              </Text>
            </View>
          ))}

          <Text style={styles.total}>Végösszeg: {totalAmount} Ft</Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

export default ConsumptionPDF;
