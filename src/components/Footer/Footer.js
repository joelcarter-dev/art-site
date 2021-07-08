import React from 'react';
import S from './footer.module.sass'
import InlineSVG from 'svg-inline-react'
import { instagram, facebook, tiktok } from '../../img/svgSketches/sketchOne'

const Footer = (props) => {
    return (
        <section className={S.footer} id={props.backgroundWhite ? S.footerWhite : S.footerBlack}>
            <div className={S.left}>
                <a className={S.svgLink} href="https://www.instagram.com/heartofarah/" target="blank">
                    <InlineSVG src={instagram} />
                </a>
                <a href="https://www.facebook.com/HeartOfArahArt" target="blank" className={S.svgLink}>
                    <InlineSVG src={facebook} />
                </a>
                <a href="https://www.tiktok.com/@heartofarah?lang=en" target="blank" className={S.svgLink}>
                    <InlineSVG src={tiktok} />
                </a>
            </div>
            <div className={S.right}>
                <p>Copyright © 2021</p>
            </div>
        </section>
    )
}

export default Footer