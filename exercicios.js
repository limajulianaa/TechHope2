<script>
    function toggleProfileMenu() {
        const menu = document.getElementbyId("profileMenu");
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }

    document.querySelector(".profile-icon").addEventListener("click" , toggleProfileMenu);
</script>