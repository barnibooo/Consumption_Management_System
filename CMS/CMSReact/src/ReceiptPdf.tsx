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
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1 solid #CCCCCC",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  total: {
    marginTop: 20,
    fontSize: 16,
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
