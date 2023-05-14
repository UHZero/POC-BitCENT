import Financas from "@/components/financas";
import Landing from "@/components/landing";
import Loading from "@/components/template/Loading";
import AuthContext from "@/data/contexts/AuthContext";
import { useContext } from "react";
// import Landing from "@/components/landing";

export default function Home() {
	const { user, loading } = useContext(AuthContext)

	if(loading) return <Loading />
	return user ? <Financas /> : <Landing />
}