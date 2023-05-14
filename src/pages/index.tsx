import Financas from "@/components/financas";
import Landing from "@/components/landing";
import AuthContext from "@/data/contexts/AuthContext";
import { useContext } from "react";
// import Landing from "@/components/landing";

export default function Home() {
	const { user } = useContext(AuthContext)
	return user ? (
		<Financas />
	) : (
		<Landing />
	)
}