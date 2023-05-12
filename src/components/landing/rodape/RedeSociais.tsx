import { IconBrandFacebook, IconBrandGithub, IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react";
import RedeSocial from "./RedeSocial";

export default function RedeSociais() {
    return (
        <div className="flex">
            <RedeSocial icone={<IconBrandYoutube />} url="https://www.youtube.com/@cod3r" key={'youtube'} />
            <RedeSocial icone={<IconBrandInstagram />} url="https://www.instagram.com/cod3rcursos" key={'instagram'} />
            <RedeSocial icone={<IconBrandFacebook />} url="https://www.facebook.com/cod3rcursos/" key={'facebook'} />
            <RedeSocial icone={<IconBrandGithub />} url="https://github.com/cod3rcursos" key={'github'} />
        </div>
    )
}