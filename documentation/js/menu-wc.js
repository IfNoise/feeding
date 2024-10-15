'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">feeding documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' :
                                            'id="xs-controllers-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' :
                                        'id="xs-injectables-links-module-AppModule-16e4a07a8a2d25ea61b6e50d980231df4e993d55f14defb41acbf7da5c1f4dfdc7dee2854008f86882df7285c4cc54f7150acba7698e942af9c9a82e7781c81b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConcentrateModule.html" data-type="entity-link" >ConcentrateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' : 'data-bs-target="#xs-controllers-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' :
                                            'id="xs-controllers-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' }>
                                            <li class="link">
                                                <a href="controllers/ConcentrateController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConcentrateController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/FertilizerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FertilizerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' : 'data-bs-target="#xs-injectables-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' :
                                        'id="xs-injectables-links-module-ConcentrateModule-f7a9e8c7e7d1d9d6b863196875dd11520f78f9d1cd05b4b76950afd81e8a400b9d5d3d394b30cfd7d9a25d545f95215e5599da5e4cbe212bf8722fc012058b6c"' }>
                                        <li class="link">
                                            <a href="injectables/ConcentrateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConcentrateService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FertilizerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FertilizerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FertilizerModule.html" data-type="entity-link" >FertilizerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' : 'data-bs-target="#xs-controllers-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' :
                                            'id="xs-controllers-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' }>
                                            <li class="link">
                                                <a href="controllers/ElementController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElementController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/FertilizerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FertilizerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' : 'data-bs-target="#xs-injectables-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' :
                                        'id="xs-injectables-links-module-FertilizerModule-902aab192d2b34a332b351faea3473c74fe2d2a75fcbee2c3424ccfac419e77741563b3de146e2fffed6fbd0932fb1790a3e2bf9723a02149c21d6d5a7c86745"' }>
                                        <li class="link">
                                            <a href="injectables/ElementService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ElementService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FertilizerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FertilizerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FertilizerUnitModule.html" data-type="entity-link" >FertilizerUnitModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' : 'data-bs-target="#xs-controllers-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' :
                                            'id="xs-controllers-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' }>
                                            <li class="link">
                                                <a href="controllers/FertilizerUnitController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FertilizerUnitController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PumpController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PumpController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' : 'data-bs-target="#xs-injectables-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' :
                                        'id="xs-injectables-links-module-FertilizerUnitModule-1e21a73231d9a3f3b0833ad7e93e0e288c96a5653fdfeda13f43446d3325ae9b621682f50e977ce151fd9c495b8ff546ae9c228f168b61db5c0a3c495d343d5d"' }>
                                        <li class="link">
                                            <a href="injectables/FertilizerUnitService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FertilizerUnitService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PumpService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PumpService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecipeModule.html" data-type="entity-link" >RecipeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' : 'data-bs-target="#xs-controllers-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' :
                                            'id="xs-controllers-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' }>
                                            <li class="link">
                                                <a href="controllers/RecipeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' : 'data-bs-target="#xs-injectables-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' :
                                        'id="xs-injectables-links-module-RecipeModule-f35fba8f5361618707e1d572307a5663de97ed8df9b8a4e6990fbd7e51d6968463a2703e6d700b852147c5617a6090f5ed3898da702ad98f239540c9430ff9dd"' }>
                                        <li class="link">
                                            <a href="injectables/RecipeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchemasModule.html" data-type="entity-link" >SchemasModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WaterModule.html" data-type="entity-link" >WaterModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' : 'data-bs-target="#xs-controllers-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' :
                                            'id="xs-controllers-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' }>
                                            <li class="link">
                                                <a href="controllers/WaterController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WaterController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' : 'data-bs-target="#xs-injectables-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' :
                                        'id="xs-injectables-links-module-WaterModule-fc43caa1cdace0a98772b7b56e6fc7d9bfada557540baae12e8d9e80ea05a4eaef0160b5abb4c72d06a9dd7a108eaff823b6e9cd8d68e2d89eaf05dc7d6984e5"' }>
                                        <li class="link">
                                            <a href="injectables/WaterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WaterService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddElementDto.html" data-type="entity-link" >AddElementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddFertilizerDto.html" data-type="entity-link" >AddFertilizerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/baseElement.html" data-type="entity-link" >baseElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/baseIon.html" data-type="entity-link" >baseIon</a>
                            </li>
                            <li class="link">
                                <a href="classes/Concentrate.html" data-type="entity-link" >Concentrate</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateConcentrateDto.html" data-type="entity-link" >CreateConcentrateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateElementDto.html" data-type="entity-link" >CreateElementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFertilizerDto.html" data-type="entity-link" >CreateFertilizerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateFertilizerUnitDto.html" data-type="entity-link" >CreateFertilizerUnitDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePumpDto.html" data-type="entity-link" >CreatePumpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRecipeDto.html" data-type="entity-link" >CreateRecipeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateWaterDto.html" data-type="entity-link" >CreateWaterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Element.html" data-type="entity-link" >Element</a>
                            </li>
                            <li class="link">
                                <a href="classes/elementForm.html" data-type="entity-link" >elementForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/Fertilizer.html" data-type="entity-link" >Fertilizer</a>
                            </li>
                            <li class="link">
                                <a href="classes/FertilizerUnit.html" data-type="entity-link" >FertilizerUnit</a>
                            </li>
                            <li class="link">
                                <a href="classes/IdParamDto.html" data-type="entity-link" >IdParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ion.html" data-type="entity-link" >Ion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Pump.html" data-type="entity-link" >Pump</a>
                            </li>
                            <li class="link">
                                <a href="classes/Recipe.html" data-type="entity-link" >Recipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/Solution.html" data-type="entity-link" >Solution</a>
                            </li>
                            <li class="link">
                                <a href="classes/solution.html" data-type="entity-link" >solution</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateConcentrateDto.html" data-type="entity-link" >UpdateConcentrateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateElementDto.html" data-type="entity-link" >UpdateElementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateElementDto-1.html" data-type="entity-link" >UpdateElementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFertilizerDto.html" data-type="entity-link" >UpdateFertilizerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFertilizerDto-1.html" data-type="entity-link" >UpdateFertilizerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFertilizerUnitDto.html" data-type="entity-link" >UpdateFertilizerUnitDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePumpDto.html" data-type="entity-link" >UpdatePumpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRecipeDto.html" data-type="entity-link" >UpdateRecipeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateWaterDto.html" data-type="entity-link" >UpdateWaterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Water.html" data-type="entity-link" >Water</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IElement.html" data-type="entity-link" >IElement</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});