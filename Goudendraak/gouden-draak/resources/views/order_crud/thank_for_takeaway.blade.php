@extends('layout')
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

@section('content')
    <div id="app" class="container bg-white">
        <div class="mt-1 bg-Menu text-center h-85">

            <h2 class="mb-2 text-chineseFont bg-darkred text-yellow">Bedankt voor je bestelling!</h2>
            <p>Neem graag de QR code mee bij het ophalen.</p>

            <img id="QR" src="{{$url}}" alt="qrCode">
            <br>
            <button id="QRbutton" class="mt-2 w-20 btn btn-dark text-white">Klik om de QR makkelijk te printen!</button>
        </div>
    </div>
@endsection

<script type="text/javascript">
    $(document).ready(function() {
        document.getElementById('QRbutton').addEventListener('click', function(e) {
            PrintImage(document.getElementById('QR').src);
        });

        function ImagetoPrint(source) {
            return "<html><head><script>function step1(){\n" +
                "setTimeout('step2()', 10);}\n" +
                "function step2(){window.print();window.close()}\n" +
                "</scri" + "pt></head><body onload='step1()'>\n" +
                "<img src='" + source + "' /></body></html>";
        }

        function PrintImage(source) {
            Pagelink = "about:blank";
            var pwa = window.open(Pagelink, "_new");
            pwa.document.open();
            pwa.document.write(ImagetoPrint(source));
            pwa.document.close();
        }
    });
</script>
